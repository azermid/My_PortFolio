import { ref } from 'vue';
import { marked } from 'marked';
import type { Repository } from '../types';
import { useCache } from './useCache';

export function useGithub() {
  const repositories = ref<Repository[]>([]);
  const errorMessage = ref<string | null>(null);
  const isLoading = ref<boolean>(true);

  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  const fetchRepoDetails = async (repoName: string): Promise<Partial<Repository>> => {
    try {
      const [readmeResponse, languagesResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, { headers }),
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`, { headers })
      ]);
      console.log('Languages response for repository:');
      const repoDetails: Partial<Repository> = {};

      if (readmeResponse.ok) {
        const { content } = await readmeResponse.json();
        repoDetails.readme = await marked.parse(atob(content));
      }

      if (languagesResponse.ok) {
        const languagesData = await languagesResponse.json();
        console.log('Languages data for repository:', repoName, languagesData);
        localStorage.setItem(`repo_languages_${repoName}`, JSON.stringify(languagesData));
        
        const totalBytes = Object.values(languagesData).reduce(
          (sum: number, bytes: number) => sum + bytes, 
          0
        );

        if (totalBytes > 0) {
          repoDetails.languages = Object.keys(languagesData);
          repoDetails.languageStats = {};
          
          Object.entries(languagesData).forEach(([language, bytes]: [string, number]) => {
            repoDetails.languageStats![language] = Math.round((bytes / totalBytes) * 100);
          });
        }
      }

      return repoDetails;
    } catch (error) {
      console.error(`Error fetching details for ${repoName}:`, error);
      return {};
    }
  };

  const fetchRepositories = async () => {
    try {
      const { loadFromCache, saveToCache } = useCache();
      const cached = loadFromCache();

      if (cached) {
        repositories.value = cached;
        isLoading.value = false;
        return;
      }

      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`,
        { headers }
      );

      if (response.status === 403) {
        errorMessage.value = "🚨 Trop de demandes sur GitHub ! Veuillez revenir dans 30 minutes ou consulter mon LinkedIn : " +
          '<a href="https://www.linkedin.com/in/amir-madaoui-08018a25b" target="_blank" class="text-blue-400 hover:text-blue-500">Mon LinkedIn</a>';
        return;
      }

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      const repos: Repository[] = await response.json();
      const reposWithDetails = await Promise.all(
        repos.map(async (repo) => ({
          ...repo,
          ...(await fetchRepoDetails(repo.name))
        }))
      );

      repositories.value = reposWithDetails.filter(
        repo => repo.languages && repo.languages.length > 0
      );

      saveToCache(repositories.value);

    } catch (error) {
      console.error('Error fetching repositories:', error);
      errorMessage.value = '❌ Une erreur est survenue lors de la récupération des projets. Veuillez réessayer plus tard.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    repositories,
    errorMessage,
    isLoading,
    fetchRepositories
  };
}