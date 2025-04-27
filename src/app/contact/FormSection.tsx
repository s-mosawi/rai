export default function FormSection() {
  return (
    <section className="pt-20">
      <div className="mx-auto container px-4 flex flex-col items-center">
        <h1 className="mb-12 text-3xl lg:text-4xl !leading-[115%] font-bold text-center">
          Have you got any <span className="text-primary">Questions?</span>
        </h1>

        <form className="w-full max-w-[900px] flex flex-col items-end">
          <div className="mb-4 w-full grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full h-[60px] px-6 border border-foreground/5 bg-primary/5 rounded-xl"
            />

            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full h-[60px] px-6 border border-foreground/5 bg-primary/5 rounded-xl"
            />
          </div>

          <textarea
            placeholder="Hello Responsble.ai team, I need help regarding..."
            required
            className="mb-4 w-full min-h-[250px] p-6 border border-foreground/5 bg-primary/5 rounded-xl"
          ></textarea>

          <button className="py-2.5 px-6 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-xl font-medium text-white hover:text-primary duration-200">
            Submit my inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
