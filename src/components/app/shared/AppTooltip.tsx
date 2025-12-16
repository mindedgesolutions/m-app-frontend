import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AppTooltip = ({
  text,
  description,
}: {
  text: string;
  description?: string;
}) => {
  const short = text.length > 20 ? `${text.slice(0, 20)}...` : text;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{short}</span>
      </TooltipTrigger>
      <TooltipContent>
        {description ? (
          <section>
            <p>{text}:</p>
            <p className="mt-1">{description}</p>
          </section>
        ) : (
          <p>{text}</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
export default AppTooltip;
