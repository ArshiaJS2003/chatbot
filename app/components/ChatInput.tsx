'use client';

import { FormEvent } from 'react';

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: {
  input: string;
  setInput: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 p-4 border-t border-zinc-200 dark:border-zinc-800">
      <input
        className="flex-1 bg-transparent px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 text-sm placeholder:text-zinc-400"
        value={input}
        onChange={e => setInput(e.currentTarget.value)}
        placeholder="Message..."
        autoFocus
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium disabled:opacity-30 hover:opacity-80 transition-opacity"
      >
        {isLoading ? '...' : 'Send'}
      </button>
    </form>
  );
}
