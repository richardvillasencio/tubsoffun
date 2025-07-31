import { AuthGuard } from '@/components/admin/auth-guard';
import { VisualEditor } from '@/components/admin/visual-editor';
import { HeaderEditor } from '@/components/admin/header-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthProvider } from '@/hooks/use-auth';

export default function AdminEdit() {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="pages" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pages">Page Content</TabsTrigger>
                <TabsTrigger value="header">Header Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pages" className="mt-6">
                <VisualEditor />
              </TabsContent>
              
              <TabsContent value="header" className="mt-6">
                <HeaderEditor />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
