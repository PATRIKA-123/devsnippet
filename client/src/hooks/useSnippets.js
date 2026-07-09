import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as snippetApi from "../api/snippets";

export function useSnippets(params = {}) {
  return useQuery({
    queryKey: ["snippets", params],
    queryFn: () => snippetApi.getSnippets(params).then((res) => res.data.snippets),
  });
}

export function useCreateSnippet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: snippetApi.createSnippet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["snippets"] }),
  });
}

export function useDeleteSnippet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: snippetApi.deleteSnippet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["snippets"] }),
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: snippetApi.toggleFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["snippets"] }),
  });
}

export function useUpdateSnippet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => snippetApi.updateSnippet(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["snippets"] }),
  });
}