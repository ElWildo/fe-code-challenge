import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import TrendIcon from '../TrendIcon/TrendIcon';
import FormattedPrice from '../FromattedPrice/FromattedPrice';
import { Fragment, memo } from 'react';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  showCardInfo: boolean;
  selectedSym: string | null;
};

const SymbolCard = memo(function SymbolCard({
  id,
  onClick,
  price,
  showCardInfo,
  selectedSym
}: SymbolCardProps) {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = () => {
    onClick(id);
  };

  function getCardClass() {
    const classes = ['symbolCard'];
    switch (selectedSym) {
      case null:
        break;
      case id:
        classes.push('symbolCard_selected');
        break;
      default:
        classes.push('symbolCard_unselected');
    }

    return classes.join(' ');
  }

  return (
    <div onClick={handleOnClick} className={getCardClass()}>
      {selectedSym == id && <div className="symbolCard__shadow" />}
      <div className="symbolCard__header">
        {id} <TrendIcon trend={trend} />
      </div>
      <FormattedPrice priceFromatted={price ? formatter.format(price) : '-'} />
      {showCardInfo && (
        <Fragment>
          <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
          <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
          <ListItem
            Icon={<MarketCapIcon />}
            label={'$' + formatter.format(marketCap)}
            spacing="space-between"
          />
        </Fragment>
      )}
    </div>
  );
});
export default SymbolCard;
