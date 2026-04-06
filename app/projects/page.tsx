import { Metadata } from 'next';
import Image from 'next/image';
import { projects } from '../data/projects';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Archive. | Mohd Sakib - Full Stack & Mobile App Developer',
    description: 'In-depth overview of all my enterprise, startup, and full-stack side projects including Mobile Apps, FinTech, EdTech, and SaaS platforms.',
};

export default function ProjectsArchive() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff9d] selection:text-black font-sans">
            {/* Header */}
            <section className="pt-40 pb-20 px-8 md:px-16 max-w-360 mx-auto">
                <Link href="/" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-300 mb-16 group">
                    <span className="text-lg transition-transform duration-300 group-hover:-translate-x-2">←</span> 
                    <span>Back to Home</span>
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-linear-to-b from-white to-white/40">
                        Project<br/>Archive.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-sm font-light leading-relaxed mb-4 md:mb-8">
                        A comprehensive breakdown of the mobile apps, complex platforms, and scalable infrastructure I've architected.
                    </p>
                </div>
            </section>

            {/* Projects Iterator */}
            <div className="flex flex-col gap-40 pb-40">
                {projects.map((project, idx) => (
                    <article key={project.id} id={project.id} className="scroll-mt-32 pt-16 px-8 md:px-16 max-w-360 mx-auto w-full relative">
                        {/* Divider Line */}
                        <div className="absolute top-0 left-8 right-8 md:left-16 md:right-16 h-px bg-neutral-800" />

                        <div className="flex flex-col lg:flex-row gap-20">
                            
                            {/* Left Col - Info */}
                            <div className="w-full lg:w-[45%] space-y-16">
                                <div>
                                    <p className="text-xs font-mono tracking-widest text-neutral-500 mb-6 flex items-center gap-4">
                                        <span className="text-[#00ff9d]">{(idx + 1).toString().padStart(2, '0')}</span> 
                                        <span className="w-8 h-px bg-neutral-800" />
                                        <span className="uppercase">{project.category}</span>
                                    </p>
                                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                                        {project.name}
                                    </h2>
                                    <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                                        {project.tagline}
                                    </p>
                                </div>

                                {/* Architecture & Stack Section */}
                                <div className="space-y-12">
                                    {/* Overview Cards */}
                                    <div className="group relative bg-[#0a0a0a] p-8 md:p-10 rounded-4xl border border-neutral-900 overflow-hidden">
                                        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        
                                        <div className="space-y-10 relative z-10">
                                            <div>
                                                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">The Problem</h3>
                                                <p className="text-neutral-300 leading-relaxed text-lg">{project.overview.problem}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">The Solution</h3>
                                                <p className="text-neutral-300 leading-relaxed text-lg">{project.overview.solution}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-900">
                                                <div>
                                                    <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Role</h3>
                                                    <p className="text-base font-medium">{project.overview.myRole}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Timeline</h3>
                                                    <p className="text-base font-medium">{project.overview.timeline}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(project.metrics).map(([key, val]) => (
                                            <div key={key} className="p-6 md:p-8 bg-[#0a0a0a] rounded-4xl border border-neutral-900 flex flex-col justify-center">
                                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">{key}</p>
                                                <p className="text-2xl md:text-3xl font-medium tracking-tight text-[#00ff9d]">{val as string}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="pt-8 border-t border-neutral-900">
                                        <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">Tech Stack & Infrastructure</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {project.stack.map(tech => (
                                                <span key={tech} className="px-4 py-2 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-full text-xs font-mono tracking-wide">
                                                    {tech}
                                                </span>
                                            ))}
                                            <span className="px-4 py-2 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-full text-xs font-mono tracking-wide">
                                                Infra: {project.architecture.infra}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap items-center gap-6 pt-6">
                                        
                                        {project.links && project.links.appstore && project.links.appstore !== '#' && (
                                            <a href={project.links.appstore} target="_blank" rel="noreferrer" className="hover:scale-105 transition active:scale-95">
                                                <Image width={140} height={44} src="/assets/appstore.png" alt="Download on the App Store" className="h-14 w-auto object-contain drop-shadow-md" />
                                            </a>
                                        )}

                                        {project.links && project.links.playstore && project.links.playstore !== '#' && (
                                            <a href={project.links.playstore} target="_blank" rel="noreferrer" className="hover:scale-105 transition active:scale-95">
                                                <Image width={140} height={44} src="/assets/playstore.png" alt="Get it on Google Play" className="h-14 w-auto object-contain drop-shadow-md" />
                                            </a>
                                        )}

                                        {project.links && project.links.webapp && project.links.webapp !== '#' && (
                                            <a 
                                                href={project.links.webapp} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
                                            >
                                                <span>Web App</span>
                                                <span className="text-xl leading-none">↗</span>
                                            </a>
                                        )}

                                        {project.links && project.links.website && project.links.website !== '#' && (
                                            <a 
                                                href={project.links.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
                                            >
                                                <span>Visit Website</span>
                                                <span className="text-xl leading-none">↗</span>
                                            </a>
                                        )}

                                        {project.links && project.links.live && project.links.live !== '#' && (!project.links.webapp && !project.links.website) && (
                                            <a 
                                                href={project.links.live} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
                                            >
                                                <span>Live Project</span>
                                                <span className="text-xl leading-none">↗</span>
                                            </a>
                                        )}
                                        
                                        {project.links && project.links.github && project.links.github !== '#' && (
                                            <a 
                                                href={project.links.github} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="px-8 py-4 bg-neutral-900 text-white border border-neutral-800 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 hover:scale-105 transition active:scale-95 flex items-center gap-3"
                                            >
                                                <span>Source Code</span>
                                                <span className="text-xl leading-none">↗</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col - Dynamic Masonry Gallery */}
                            <div className="w-full lg:w-[55%]">
                                {/* Sticky container wrapper so the gallery scrolls naturally until finished */}
                                <div className="sticky top-12 pb-12">
                                    <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                                        {project.gallery.map((media, i) => (
                                            <div 
                                                key={i} 
                                                className="break-inside-avoid relative rounded-4xl overflow-hidden bg-neutral-900 border border-neutral-800 group"
                                            >
                                                {media.type === 'image' ? (
                                                    <Image
                                                        src={media.src}
                                                        alt={`${project.name} preview ${i + 1}`}
                                                        loading="lazy"
                                                        width={600}
                                                        height={800}
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-out"
                                                    />
                                                ) : (
                                                    <video
                                                        src={media.src}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        className="w-full h-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-out"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </article>
                ))}
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-neutral-900 text-center text-neutral-500 text-sm tracking-widest uppercase font-mono">
                <p>© {new Date().getFullYear()} Mohd Sakib.</p>
            </footer>
        </main>
    );
}
