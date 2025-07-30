import { AuthGuard } from '@/components/admin/auth-guard';
import { VisualEditor } from '@/components/admin/visual-editor';
import { AuthProvider } from '@/hooks/use-auth';

export default function AdminEdit() {
  return (
    <AuthProvider>
      <AuthGuard>
        <VisualEditor />
      </AuthGuard>
    </AuthProvider>
  );
}
