export function ArticleBodyContent({ blocks }: { blocks: string[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.endsWith(":") ? (
          <h2
            key={index}
            className="pt-5 text-xl font-black text-volt sm:text-2xl"
          >
            {block.slice(0, -1)}
          </h2>
        ) : (
          <p key={index} className="text-lg leading-relaxed text-chalk">
            {block}
          </p>
        ),
      )}
    </>
  );
}
