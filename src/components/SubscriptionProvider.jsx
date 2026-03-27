import { SubscriptionContext, useSubscriptionProvider } from "@/hooks/useSubscription";

export default function SubscriptionProvider({ children }) {
  const value = useSubscriptionProvider();
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}