/**
 * The pattern catalog: every pattern MAP knows about, written or not.
 *
 * A `CatalogEntry` is deliberately lighter than `Pattern`. The full `Pattern` type
 * models a completely written pattern document; the catalog also tracks patterns
 * that only exist as roadmap items, so most fields are unknown for them. Commands
 * that list, search, or cross-reference patterns (patterns, recommend, doctor)
 * work against the catalog; `Pattern` stays reserved for loaded documents.
 */

import type { PatternId, PatternCategory } from "./pattern.ts";

/** Mirrors the roadmap legend: ⬜ Planned · 🟡 In progress · ✅ Published. */
export type CatalogStatus = "published" | "in-progress" | "planned";

/**
 * The five MAP Score dimensions, 1..5 stars each. The schema (and rendering)
 * is the shared @missing-ai-patterns/score package; the registry builder
 * validates values, so entries parsed from a registry satisfy it.
 */
import type { MapScore } from "@missing-ai-patterns/score";
export type { MapScore };

export interface CatalogEntry {
  readonly id: PatternId;
  readonly name: string;
  readonly category: PatternCategory;
  readonly status: CatalogStatus;
  /** One-line summary; present when the pattern is written. */
  readonly summary?: string;
  /** Maturity (e.g. "established"); present when written. */
  readonly maturity?: string;
  /** Alternative names for the pattern. */
  readonly alsoKnownAs?: readonly string[];
  /** MAP Score; present when written and complete. */
  readonly score?: MapScore;
  /** Decision guidance from the pattern contract; present when written. */
  readonly whenToUse?: readonly string[];
  readonly whenNotToUse?: readonly string[];
  /** Related pattern ids; present when written. */
  readonly related?: readonly PatternId[];
  /** External references (papers, articles). */
  readonly references?: readonly string[];
  /**
   * Pattern files embedded by the registry (`prompt.md`, `acceptance.md`),
   * so `map add` can scaffold them without network access.
   */
  readonly files?: Readonly<Record<string, string>>;
}
