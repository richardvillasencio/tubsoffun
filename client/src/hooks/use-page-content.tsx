import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { LayoutBlock, Page } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

export function usePageContent(slug: string = 'homepage') {
  const queryClient = useQueryClient();

  const pageQuery = useQuery<Page>({
    queryKey: ['/api/pages', slug],
  });

  const blocksQuery = useQuery<LayoutBlock[]>({
    queryKey: ['/api/layout-blocks', slug],
  });

  const updateBlockMutation = useMutation({
    mutationFn: async (block: Partial<LayoutBlock>) => {
      return await apiRequest('PATCH', `/api/layout-blocks/${block.id}`, block);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/layout-blocks', slug] });
    },
  });

  const reorderBlocksMutation = useMutation({
    mutationFn: async (blocks: LayoutBlock[]) => {
      return await apiRequest('PUT', `/api/layout-blocks/reorder`, { blocks });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/layout-blocks', slug] });
    },
  });

  const createBlockMutation = useMutation({
    mutationFn: async (block: Omit<LayoutBlock, 'id' | 'createdAt' | 'updatedAt'>) => {
      return await apiRequest('POST', '/api/layout-blocks', block);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/layout-blocks', slug] });
    },
  });

  const deleteBlockMutation = useMutation({
    mutationFn: async (blockId: string) => {
      return await apiRequest('DELETE', `/api/layout-blocks/${blockId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/layout-blocks', slug] });
    },
  });

  return {
    page: pageQuery.data,
    blocks: blocksQuery.data || [],
    isLoading: pageQuery.isLoading || blocksQuery.isLoading,
    updateBlock: updateBlockMutation.mutate,
    reorderBlocks: reorderBlocksMutation.mutate,
    createBlock: createBlockMutation.mutate,
    deleteBlock: deleteBlockMutation.mutate,
    isUpdating: updateBlockMutation.isPending || reorderBlocksMutation.isPending,
  };
}
