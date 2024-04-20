import {
  findTableElements,
  getMeanMedianMode,
  transposeOfMatrix,
} from "../utils/UtilFunctions";
import _Data from "../data/Wine-Data.json";
import TableComponent from "../components/Table";

export interface JsonData {
  Alcohol: string | number;
  "Malic Acid": string | number;
  Ash: string | number;
  "Alcalinity of ash": string | number;
  Magnesium: string | number;
  "Total phenols": string | number;
  Flavanoids: string | number;
  "Nonflavanoid phenols": string | number;
  Proanthocyanins: string | number;
  "Color intensity": string | number;
  Hue: string | number;
  "OD280/OD315 of diluted wines": string | number;
  Unknown: string | number;
}

const Data = _Data as JsonData[];

const Home = () => {
  //FLAVONOIDS DATA
  const flavMap = new Map();
  const gammaMap = new Map();

  const makeMapOfArrays = (gammaFlag: Boolean) => {
    for (let i = 0; i < Data.length; i++) {
      if (!flavMap.has(Data[i].Alcohol)) {
        flavMap.set(Data[i].Alcohol, []);
        gammaMap.set(Data[i].Alcohol, []);
      }
      if (!gammaFlag) {
        flavMap.get(Data[i].Alcohol).push(Number(Data[i].Flavanoids));
      }

      if (gammaFlag) {
        // Calculate gamma value
        const gamma =
          (Number(Data[i].Ash) * Number(Data[i].Hue)) /
          Number(Data[i].Magnesium);
        gammaMap.get(Data[i].Alcohol).push(Number(gamma.toFixed(2)));
      }
    }
  };
  makeMapOfArrays(false);
  makeMapOfArrays(true);

  const statsDataFlav: Array<number | string | any> = [];
  flavMap.forEach((value, key) => {
    let { mean, median, mode } = getMeanMedianMode(value);
    statsDataFlav.push([
      "class" + key,
      mean.toFixed(3),
      median.toFixed(3),
      mode.toFixed(3),
    ]);
  });

  const statsDataGamma: Array<number | string | any> = [];
  gammaMap.forEach((value, key) => {
    let { mean, median, mode } = getMeanMedianMode(value);
    statsDataGamma.push([
      "class" + key,
      mean.toFixed(3),
      median.toFixed(3),
      mode.toFixed(3),
    ]);
  });

  const transposedDataFlav = transposeOfMatrix(statsDataFlav);
  const transposedDataGamma = transposeOfMatrix(statsDataGamma);

  const elementsFlav = findTableElements(transposedDataFlav, "Flavonoids");
  const elementsGamma = findTableElements(transposedDataGamma, "Gamma");

  return (
    <>
      <div className="header">
        <span className="wine-icon">🍷</span> Statistics of Wine Data
      </div>
      <div className="container">
        <div className="table">
          <h2>
            Statistics of <i>Flavonoids </i>in vine
          </h2>
          <TableComponent elements={elementsFlav} />
        </div>
        <div className="table">
          <h2>
            Statistics of <i>Gamma</i> in vine
          </h2>
          <TableComponent elements={elementsGamma} />
        </div>
      </div>
    </>
  );
};

export default Home;
