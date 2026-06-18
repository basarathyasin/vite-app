import BasicForm from "@/components/forms/BasicForm";

export default function Contact() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have a question or want to work with us?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Get In Touch
          </h2>

          <BasicForm />
        </div>
      </section>
    </div>
  );
}