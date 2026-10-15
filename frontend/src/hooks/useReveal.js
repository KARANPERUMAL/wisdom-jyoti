import { useEffect } from "react";

export function useReveal(page) {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    // Observe a node only once (skip already-revealed or already-watched nodes)
    function observeNode(node) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.hasAttribute("data-reveal") &&
        !node.classList.contains("is-visible")
      ) {
        intersectionObserver.observe(node);
      }
    }

    // Query elements already in the DOM at effect time (eager page / re-navigation)
    document.querySelectorAll("[data-reveal]").forEach(observeNode);

    // Watch for [data-reveal] nodes added *after* this effect fires.
    // This handles lazy pages whose DOM is injected by Suspense after the chunk
    // resolves — which happens after the effect has already run.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // Check the added node itself
          observeNode(node);
          // Check any [data-reveal] descendants
          if (node.nodeType === Node.ELEMENT_NODE) {
            node.querySelectorAll("[data-reveal]").forEach(observeNode);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [page]);
}
