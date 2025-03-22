import Fuse from 'fuse.js';

interface FuseSearchOptions {
  keys: string[];
  threshold: number;
}

const useFuseSearch = <T>(data: T[], options: FuseSearchOptions, searchQuery: string): T[] => {
  const fuse = new Fuse(data, options);
  const result = searchQuery ? fuse.search(searchQuery).map((result) => result.item) : data;
  return result;
};

export default useFuseSearch;
