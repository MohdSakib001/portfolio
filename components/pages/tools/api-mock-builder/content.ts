import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is an API mock and why would I need one?",
    answer:
      "An API mock is a simulated HTTP endpoint that returns a predefined response without executing any real server logic. You need one when the backend isn't built yet, when you want to test specific status codes (like 500 errors) that are hard to trigger in production, or when you want to work offline. Mocks let frontend and backend teams work in parallel without blocking each other.",
  },
  {
    question: "How does this tool generate curl and fetch snippets?",
    answer:
      "The tool reads your configured HTTP method, URL path, headers, and response body and assembles them into a syntactically correct curl command and a JavaScript fetch snippet. Both are generated entirely in the browser — no data leaves your device. You can copy either snippet and use it in a terminal, a test file, or a code review comment.",
  },
  {
    question: "What does the response delay slider do?",
    answer:
      "The delay value represents a simulated latency in milliseconds. It's reflected in the generated fetch snippet as an await new Promise(r => setTimeout(r, Nms)) call before the fetch, so your code behaves as if the server takes N milliseconds to respond. This is useful for testing loading states, skeleton screens, and timeout logic.",
  },
  {
    question: "Can I use this tool instead of Postman or Insomnia?",
    answer:
      "This tool is a lightweight companion for quickly generating request snippets and visualising mock responses — it doesn't send real HTTP requests. For full API testing (sending live requests, reading real responses, scripting test chains) you'll still want Postman, Insomnia, or HTTPie. Think of this as a fast snippet generator and response visualiser, not a full API client.",
  },
  {
    question:
      "How does 'Generate Sample Response' decide what JSON to produce?",
    answer:
      "The generator inspects your URL path for keywords. Paths containing 'user', 'auth', 'login', or 'account' produce a user object with id, name, email, and role fields. Paths with 'product', 'item', or 'catalog' produce a product object with price and stock fields. Paths with 'order', 'cart', or 'checkout' produce an order object. All other paths produce a generic success payload. You can edit the generated JSON freely.",
  },
  {
    question: "Is any of my data sent to a server?",
    answer:
      "No. This tool runs entirely in your browser. The URL path, headers, JSON body, and any sensitive values you type never leave your machine. There are no analytics events, no server requests, and no storage beyond the current browser tab session. Close the tab and everything is gone.",
  },
];
