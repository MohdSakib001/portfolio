export type Project = {
    id: string;

    // identity
    name: string;
    tagline: string;
    category: "startup" | "client" | "experiment";

    // hero media
    hero: {
        type: "video" | "image";
        src: string;
        poster?: string;
    };

    // multi media gallery
    gallery: {
        type: "image" | "video";
        src: string;
    }[];

    // product story
    overview: {
        problem: string;
        solution: string;
        myRole: string;
        timeline: string;
    };

    // REAL IMPACT (this is what makes it premium)
    metrics: {
        users?: string;        // "12k MAU"
        revenue?: string;      // "$8k MRR"
        performance?: string;  // "95 lighthouse"
        scale?: string;        // "handles 10k concurrent"
    };

    // achievements / wins
    achievements: string[];

    // tech depth
    stack: string[];

    // architecture (THIS IS BIG BOY SHIT)
    architecture: {
        frontend: string;
        backend: string;
        realtime?: string;
        infra?: string;
    };

    // links
    links: {
        live?: string;
        github?: string;
        playstore?: string;
        appstore?: string;
        webapp?: string;
        website?: string;
    };

    // highlight features
    features: string[];
};