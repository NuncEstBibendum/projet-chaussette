type CardType = {
  name: string;
  image_uris: {
    normal: string;
    art_crop: string;
    border_crop: string;
    large: string;
    png: string;
    small: string;
  };
  cmc: number;
  type_line: string;
  colors: string[];
  mana_cost: string;
  oracle_text: string;
  power?: string;
  toughness?: string;
  rarity: string;
  set_name: string;
  flavor_text?: string;
  artist: string;
  set: string;
  keywords: string[];
  setIcon: string;
};

export default CardType;
