import type { Repository } from '../types';

const CACHE_KEY = "github_repos";
const CACHE_EXPIRATION_KEY = "github_repos_expiration";
const CACHE_DURATION = 1000 * 60 * 60 * 24;

export function useCache() {
  const saveToCache = (repositories: Repository[]) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(repositories));
    localStorage.setItem(
      CACHE_EXPIRATION_KEY,
      (Date.now() + CACHE_DURATION).toString()
    );
  };

  const loadFromCache = (): Repository[] | null => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const expiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

    if (cachedData && expiration && Date.now() < parseInt(expiration)) {
      return JSON.parse(cachedData);
    }
    return null;
  };

  return {
    saveToCache,
    loadFromCache,
    CACHE_KEY,
    CACHE_EXPIRATION_KEY,
    CACHE_DURATION
  };
}