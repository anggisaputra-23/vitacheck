import { Suspense, lazy } from 'react';

const ChatBot = lazy(() => import('./ChatBot'));

export default function ChatBotWrapper() {
  return (
    <Suspense fallback={null}>
      <ChatBot />
    </Suspense>
  );
}
