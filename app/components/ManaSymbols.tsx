import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";
import Icon0 from "../../assets/icons/_0_.svg";
import Icon1000000 from "../../assets/icons/_1000000_.svg";
import Icon100 from "../../assets/icons/_100_.svg";
import Icon10 from "../../assets/icons/_10_.svg";
import Icon11 from "../../assets/icons/_11_.svg";
import Icon12 from "../../assets/icons/_12_.svg";
import Icon13 from "../../assets/icons/_13_.svg";
import Icon14 from "../../assets/icons/_14_.svg";
import Icon15 from "../../assets/icons/_15_.svg";
import Icon16 from "../../assets/icons/_16_.svg";
import Icon17 from "../../assets/icons/_17_.svg";
import Icon18 from "../../assets/icons/_18_.svg";
import Icon19 from "../../assets/icons/_19_.svg";
import Icon1 from "../../assets/icons/_1_.svg";
import Icon20 from "../../assets/icons/_20_.svg";
import Icon2 from "../../assets/icons/_2_.svg";
import Icon3 from "../../assets/icons/_3_.svg";
import Icon4 from "../../assets/icons/_4_.svg";
import Icon5 from "../../assets/icons/_5_.svg";
import Icon6 from "../../assets/icons/_6_.svg";
import Icon7 from "../../assets/icons/_7_.svg";
import Icon8 from "../../assets/icons/_8_.svg";
import Icon9 from "../../assets/icons/_9_.svg";
import IconA from "../../assets/icons/_A_.svg";
import IconB from "../../assets/icons/_B_.svg";
import IconBG from "../../assets/icons/_B_G_.svg";
import IconBGP from "../../assets/icons/_B_G_P_.svg";
import IconBP from "../../assets/icons/_B_P_.svg";
import IconBR from "../../assets/icons/_B_R_.svg";
import IconBRP from "../../assets/icons/_B_R_P_.svg";
import IconC from "../../assets/icons/_C_.svg";
import IconCB from "../../assets/icons/_C_B_.svg";
import IconCG from "../../assets/icons/_C_G_.svg";
import IconCP from "../../assets/icons/_C_P_.svg";
import IconCR from "../../assets/icons/_C_R_.svg";
import IconCU from "../../assets/icons/_C_U_.svg";
import IconCW from "../../assets/icons/_C_W_.svg";
import IconChaos from "../../assets/icons/_CHAOS_.svg";
import IconD from "../../assets/icons/_D_.svg";
import IconE from "../../assets/icons/_E_.svg";
import IconG from "../../assets/icons/_G_.svg";
import IconGP from "../../assets/icons/_G_P_.svg";
import IconGU from "../../assets/icons/_G_U_.svg";
import IconGUP from "../../assets/icons/_G_U_P_.svg";
import IconGW from "../../assets/icons/_G_W_.svg";
import IconGWP from "../../assets/icons/_G_W_P_.svg";
import IconH from "../../assets/icons/_H_.svg";
import IconHR from "../../assets/icons/_HR_.svg";
import IconHW from "../../assets/icons/_HW_.svg";
import IconL from "../../assets/icons/_L_.svg";
import IconP from "../../assets/icons/_P_.svg";
import IconPW from "../../assets/icons/_PW_.svg";
import IconQ from "../../assets/icons/_Q_.svg";
import IconR from "../../assets/icons/_R_.svg";
import IconRG from "../../assets/icons/_R_G_.svg";
import IconRGP from "../../assets/icons/_R_G_P_.svg";
import IconRP from "../../assets/icons/_R_P_.svg";
import IconRW from "../../assets/icons/_R_W_.svg";
import IconRWP from "../../assets/icons/_R_W_P_.svg";
import IconS from "../../assets/icons/_S_.svg";
import IconT from "../../assets/icons/_T_.svg";
import IconTK from "../../assets/icons/_TK_.svg";
import IconU from "../../assets/icons/_U_.svg";
import IconUB from "../../assets/icons/_U_B_.svg";
import IconUBP from "../../assets/icons/_U_B_P_.svg";
import IconUP from "../../assets/icons/_U_P_.svg";
import IconUR from "../../assets/icons/_U_R_.svg";
import IconURP from "../../assets/icons/_U_R_P_.svg";
import IconW from "../../assets/icons/_W_.svg";
import IconWB from "../../assets/icons/_W_B_.svg";
import IconWBP from "../../assets/icons/_W_B_P_.svg";
import IconWP from "../../assets/icons/_W_P_.svg";
import IconWU from "../../assets/icons/_W_U_.svg";
import IconWUP from "../../assets/icons/_W_U_P_.svg";
import IconX from "../../assets/icons/_X_.svg";
import IconY from "../../assets/icons/_Y_.svg";
import IconZ from "../../assets/icons/_Z_.svg";
import IconHalf from "../../assets/icons/_½_.svg";
import IconInfinity from "../../assets/icons/_∞_.svg";

interface SvgComponent extends React.FC<SvgProps> {
  default?: React.FC<SvgProps>;
}

// Function to parse mana cost into individual symbols
const parseManaSymbols = (manaCost: string): string[] => {
  const symbolRegex = /{[^}]+}/g;
  return manaCost.match(symbolRegex) || [];
};

// Import SVG assets
const manaSymbolAssets: { [key: string]: SvgComponent } = {
  // Numeric mana
  "0": Icon0,
  "1": Icon1,
  "2": Icon2,
  "3": Icon3,
  "4": Icon4,
  "5": Icon5,
  "6": Icon6,
  "7": Icon7,
  "8": Icon8,
  "9": Icon9,
  "10": Icon10,
  "11": Icon11,
  "12": Icon12,
  "13": Icon13,
  "14": Icon14,
  "15": Icon15,
  "16": Icon16,
  "17": Icon17,
  "18": Icon18,
  "19": Icon19,
  "20": Icon20,
  "100": Icon100,
  "1000000": Icon1000000,
  "½": IconHalf,
  "∞": IconInfinity,
  A: IconA,
  B: IconB,
  C: IconC,
  D: IconD,
  E: IconE,
  G: IconG,
  H: IconH,
  L: IconL,
  P: IconP,
  Q: IconQ,
  R: IconR,
  S: IconS,
  T: IconT,
  U: IconU,
  W: IconW,
  X: IconX,
  Y: IconY,
  Z: IconZ,
  BG: IconBG,
  BGP: IconBGP,
  BP: IconBP,
  BR: IconBR,
  BRP: IconBRP,
  CB: IconCB,
  CG: IconCG,
  CP: IconCP,
  CR: IconCR,
  CU: IconCU,
  CW: IconCW,
  CHAOS: IconChaos,
  GP: IconGP,
  GU: IconGU,
  GUP: IconGUP,
  GW: IconGW,
  GWP: IconGWP,
  HR: IconHR,
  HW: IconHW,
  PW: IconPW,
  RG: IconRG,
  RGP: IconRGP,
  RP: IconRP,
  RW: IconRW,
  RWP: IconRWP,
  TK: IconTK,
  UB: IconUB,
  UBP: IconUBP,
  UP: IconUP,
  UR: IconUR,
  URP: IconURP,
  WB: IconWB,
  WBP: IconWBP,
  WP: IconWP,
  WU: IconWU,
  WUP: IconWUP,
};

const ManaSymbols = ({ manaCost }: { manaCost: string }) => {
  const symbols = parseManaSymbols(manaCost);
  const slicedSymbols = symbols.map((symbol) => symbol.slice(1, -1));

  return (
    <View style={styles.manaContainer}>
      {slicedSymbols.map((symbol, index) => {
        const SvgComponent = manaSymbolAssets[symbol];
        return SvgComponent ? (
          <View key={index} style={styles.manaSymbol}>
            <SvgComponent width={18} height={18} />
          </View>
        ) : null;
      })}
    </View>
  );
};

export default ManaSymbols;

const styles = StyleSheet.create({
  manaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  manaSymbol: {
    width: 18,
    height: 18,
    marginHorizontal: 1,
    borderRadius: 100,
    borderColor: "black",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 20,
  },
});
