export default function Banner({
    title = '',
    subtitle = '',
}: {
    title: string,
    subtitle: string,
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-2 w-full h-48 parallax-bg newspaper-bg my-8">
          <h1 className="w-9/12 text-center text-3xl text-white font-bold uppercase">
              {title}
          </h1>
          {subtitle !== '' && (
              <h2 className="w-9/12 text-center text-xl text-white capitalize">
                  {subtitle}
              </h2>
          )}
        </section>
    );
};
