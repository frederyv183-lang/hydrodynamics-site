import { introduction } from "./introduction";
import { composition } from "./composition";
import { statics } from "./statics";
import { structure } from "./structure";
import { solarRadiation } from "./solar-radiation";
import { extinction } from "./extinction";
import { earthRadiation } from "./earth-radiation";
import { radiationBalance } from "./radiation-balance";
import { thermodynamics } from "./thermodynamics";
import { dynamics } from "./dynamics";
import { boundaryLayer } from "./boundary-layer";
import { phaseTransitions } from "./phase-transitions";
import { turbulence } from "./turbulence";
import { optics } from "./optics";
import { clouds } from "./clouds";
import { circulation } from "./circulation";
import { equations } from "./equations";
import { coordinates } from "./coordinates";
import { projections } from "./projections";

export type AtmosphereFormula = {
  slug: string;
  title: string;
  short: string;
  latex: string;
  about?: string;
  variables?: { symbol: string; meaning: string }[];
};

export type AtmosphereConcept = {
  term: string;
  definition: string;
};

export type AtmosphereSection = {
  slug: string;
  order: number;
  title: string;
  matveevChapter: string;
  short: string;
  description: string;
  concepts: AtmosphereConcept[];
  formulas: AtmosphereFormula[];
};

export const sections: AtmosphereSection[] = [
  introduction,
  composition,
  statics,
  structure,
  solarRadiation,
  extinction,
  earthRadiation,
  radiationBalance,
  thermodynamics,
  dynamics,
  boundaryLayer,
  phaseTransitions,
  turbulence,
  optics,
  clouds,
  circulation,
  equations,
  coordinates,
  projections,
].sort((a, b) => a.order - b.order);

export function getSection(slug: string): AtmosphereSection | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getAllFormulas(): (AtmosphereFormula & { sectionSlug: string; sectionTitle: string })[] {
  return sections.flatMap((s) =>
    s.formulas.map((f) => ({
      ...f,
      sectionSlug: s.slug,
      sectionTitle: s.title
    }))
  );
}
