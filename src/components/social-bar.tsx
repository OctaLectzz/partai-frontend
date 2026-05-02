export default function SocialBar() {
  return (
    <div className="relative z-30 bg-golkar-dark-gold shadow-lg">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-4 py-4 md:gap-10">
        {/* Dividers between items (desktop) */}
        <style>{`
          @media (min-width: 768px) {
            .social-divider { display: block; }
          }
        `}</style>
      </div>
    </div>
  )
}
