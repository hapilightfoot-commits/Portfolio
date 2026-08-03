export const metadata = { title: "About — Hapi Lightfoot" };

const SKILLS = [
  "Photography",
  "Filmmaking",
  "Product Design",
  "Frontend Engineering",
  "Editing",
  "Sound Design",
];

export const metadata = { title: "About — Hapi Lightfoot" };

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <p className="eyebrow mb-5">About</p>

      <p className="font-display text-2xl sm:text-3xl leading-snug mb-10 text-parchment">
        I don't remember deciding that I wanted to tell stories. I only remember
        becoming fascinated by the people, places, and questions that make them worth
        telling.
      </p>

      <div className="space-y-6 font-body text-parchment/90 leading-relaxed">
        <p>
          I am drawn to the moments that most people walk past, the conversations that
          linger after everyone has gone home, the history hidden inside ordinary
          places, the quiet beauty of everyday life, and the ideas that have the power
          to change how we see the world. Writing always gave my questions a voice. My
          camera has become one way of paying attention. Film is another, and
          technology opened the door to building tools that help us all explore our
          personal creativity.
        </p>
        <p>This space is where all of those paths meet.</p>
        <p>
          Here you'll find documentaries and films, photographs, essays, experiments,
          and apps born from my curiosity about the worlds around me. Some projects
          begin with a camera. Others begin with a notebook, a conversation, or a
          question I can't stop thinking about. Every project is an attempt to
          understand something a little more deeply, and to invite others into that
          discovery.
        </p>
        <p>
          I don't believe creativity belongs in separate boxes. Storytelling,
          photography, filmmaking, design, and technology are all languages for
          exploring the same thing: what it means to be human. Whether I'm documenting
          a community, building an interactive experience, or writing about an idea
          that's still taking shape, I'm searching for connection, understanding, and
          the possibility that a single story can inspire someone to see the world
          differently.
        </p>
        <p>
          This portfolio isn't a collection of finished work as much as it is a record
          of that journey. Thanks for being here while it's still unfolding.
        </p>
      </div>
    </div>
  );
}
