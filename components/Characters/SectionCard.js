const SectionCard = ({
  index,
  itemTitle,
  itemEpisodeId,
  itemDirector,
  displayValue,
  itemProducer,
  itemReleaseDate,
  itemOpeningCrawl,
}) => {
  return (
    <li key={index} className="border-b pb-2 last:border-b-0">
      <h3 className="font-semibold">{itemTitle}</h3>
      {itemEpisodeId && <p>Episode: {itemEpisodeId}</p>}
      {itemDirector && <p>Director: {displayValue(itemDirector)}</p>}
      {itemProducer && <p>Producer: {displayValue(itemProducer)}</p>}
      {itemReleaseDate && <p>Release Date: {displayValue(itemReleaseDate)}</p>}
      {itemOpeningCrawl && (
        <p className="mt-2 text-sm italic">{itemOpeningCrawl}</p>
      )}
    </li>
  );
};
export default SectionCard;
