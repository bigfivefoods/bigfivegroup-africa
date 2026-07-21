/**
 * Browser-safe newsletter exports (no Node fs / Redis).
 * Client components must import from here, not from `./index`.
 */

export {
  NEWSLETTER_TOPIC_OPTIONS,
  NEWSLETTER_TOPICS,
  ALL_TOPIC_IDS,
  type NewsletterTopicId,
  type SubscriberStatus,
  type NewsletterSubscribeInput,
  type NewsletterSubscribeResult,
} from "./types";

export {
  isValidNewsletterEmail,
  normalizeEmail,
  normalizeTopics,
} from "./validation";
