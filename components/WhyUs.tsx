export default function WhyUs() {
  const points = [
    { title: "Verified Listings", desc: "Every property is physically inspected and legally vetted before listing." },
    { title: "Transparent Process", desc: "Clear paperwork, no hidden charges, and honest market guidance." },
    { title: "Client-First Approach", desc: "We prioritize your requirements over quick sales." },
    { title: "Documentation Support", desc: "End-to-end assistance with government paperwork and compliance." },
  ];

  return (
    <section id="why-us" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">The Property108 Standard</h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              In a crowded market, we stand apart by offering clarity. Our approach merges traditional real estate values with modern efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {points.map((point, index) => (
              <div key={index} className="border-l-2 border-stone-300 pl-6">
                <h3 className="text-lg font-medium text-stone-900 mb-2">{point.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}