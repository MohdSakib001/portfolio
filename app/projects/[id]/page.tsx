"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { projects } from "@/app/data/projects";

export default function ProjectPage() {
    const { id } = useParams();

    const project = projects.find((p) => p.id === id);

    if (!project) return <div>Not found</div>;

    return (
        <main className="bg-white text-black">

            {/* HERO */}
            <section className="relative h-[80vh] w-full">
                {project.hero.type === "image" ? (
                    <Image
                        src={project.hero.src}
                        alt={project.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <video
                        src={project.hero.src}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-10 left-10 text-white">
                    <h1 className="text-5xl md:text-7xl">{project.name}</h1>
                    <p className="mt-2 opacity-80">{project.tagline}</p>
                </div>
            </section>

            {/* METRICS */}
            <section className="px-6 md:px-16 py-16 border-b">
                <div className="flex flex-wrap gap-6 text-lg">
                    {Object.values(project.metrics).map((m, i) => (
                        <div key={i} className="border px-4 py-2">
                            {m}
                        </div>
                    ))}
                </div>
            </section>

            {/* OVERVIEW */}
            <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl mb-4">Problem</h2>
                    <p className="opacity-70">{project.overview.problem}</p>
                </div>

                <div>
                    <h2 className="text-3xl mb-4">Solution</h2>
                    <p className="opacity-70">{project.overview.solution}</p>
                </div>

                <div>
                    <h2 className="text-3xl mb-4">Role</h2>
                    <p className="opacity-70">{project.overview.myRole}</p>
                </div>

                <div>
                    <h2 className="text-3xl mb-4">Timeline</h2>
                    <p className="opacity-70">{project.overview.timeline}</p>
                </div>
            </section>

            {/* GALLERY */}
            <section className="px-6 md:px-16 py-24">
                <h2 className="text-4xl mb-12">Product</h2>

                <div className="flex flex-col gap-10">
                    {project.gallery.map((item, i) => (
                        <div key={i} className="relative w-full h-[400px]">
                            {item.type === "image" ? (
                                <Image
                                    src={item.src}
                                    alt="gallery"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <video
                                    src={item.src}
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ARCHITECTURE */}
            <section className="px-6 md:px-16 py-24 border-t">
                <h2 className="text-4xl mb-12">Architecture</h2>

                <div className="grid md:grid-cols-2 gap-10 text-sm">
                    <div>
                        <p className="font-semibold mb-2">Frontend</p>
                        <p className="opacity-70">{project.architecture.frontend}</p>
                    </div>

                    <div>
                        <p className="font-semibold mb-2">Backend</p>
                        <p className="opacity-70">{project.architecture.backend}</p>
                    </div>

                    {project.architecture.realtime && (
                        <div>
                            <p className="font-semibold mb-2">Realtime</p>
                            <p className="opacity-70">{project.architecture.realtime}</p>
                        </div>
                    )}

                    {project.architecture.infra && (
                        <div>
                            <p className="font-semibold mb-2">Infra</p>
                            <p className="opacity-70">{project.architecture.infra}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* FEATURES */}
            <section className="px-6 md:px-16 py-24">
                <h2 className="text-4xl mb-12">Features</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {project.features.map((f, i) => (
                        <div key={i} className="border p-4">
                            {f}
                        </div>
                    ))}
                </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="px-6 md:px-16 py-24 border-t">
                <h2 className="text-4xl mb-12">Impact</h2>

                <div className="flex flex-col gap-4">
                    {project.achievements.map((a, i) => (
                        <div key={i} className="text-lg">
                            {a}
                        </div>
                    ))}
                </div>
            </section>

            {/* LINKS */}
            <section className="px-6 md:px-16 py-24 border-t">
                <h2 className="text-4xl mb-8">Explore</h2>

                <div className="flex gap-6">
                    {project.links.live && <a href={project.links.live}>Live</a>}
                    {project.links.github && <a href={project.links.github}>GitHub</a>}
                </div>
            </section>
        </main>
    );
}