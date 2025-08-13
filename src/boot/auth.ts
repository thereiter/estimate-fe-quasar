import { defineBoot } from '#q-app/wrappers';
import { useAuthStore } from 'stores/auth';

export default defineBoot(({ app, router, store, ssrContext }) => {
  const authState = useAuthStore(store);
});
