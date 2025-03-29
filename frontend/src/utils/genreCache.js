let cachedGenres = null;

export const getCachedGenres = async (fetchGenresFunc) => {
    if (cachedGenres) return cachedGenres;

    cachedGenres = await fetchGenresFunc();
    return cachedGenres;
}