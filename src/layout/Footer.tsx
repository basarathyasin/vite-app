export default function Footer() {
  return (
   <footer className="bg-[#F3F4F5] px-6 py-12 md:px-12">
  <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h2 className="font-heading text-xl font-bold">
        VITE
      </h2>

      <p className="mt-6 text-base text-[#6B7280]">
        © 2024 Premium SaaS. All rights reserved..
      </p>
    </div>

    <div className="flex flex-wrap gap-x-12 gap-y-8 items-center text-base text-[#6B7280]">
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/security">Security</a>
      <a href="/status">Status</a>
      <a href="/twitter">Twitter</a>
      <a href="/linkedin">LinkedIn</a>
    </div>
  </div>
</footer>
  );
}