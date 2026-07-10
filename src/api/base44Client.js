import { supabase } from '@/lib/supabase';


export const base44 = {
  auth: {
    me: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user || null;
    },
    logout: async () => {
      await supabase.auth.signOut();
      window.location.href = '/';
    },
    redirectToLogin: () => {
      window.location.href = '/admin/login';
    }
  }
};
