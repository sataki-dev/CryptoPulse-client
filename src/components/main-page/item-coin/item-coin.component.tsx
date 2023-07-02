import style from "./item-coin.module.scss"
import {CoinInterfaces} from "../../../core/types/defolt-types";

const ItemCoinComponent = (props: CoinInterfaces) => {

    const correctPrice = (data: string) => {
        return Number(data).toFixed(3)
    }

    return (
        <div className={style.main}>
            <div className={style.main_symbol}>{props.symbol}</div>
            <div className={style.main_content}>
                <div className={style.main_content_name}>{props.name}</div>
                <div className={style.main_content_price}>{correctPrice(props.priceUsd)}</div>
                <div style={Number(props.changePercent24Hr) < 0 ? {color: '#C41E3A'} :{color: '#00CC66'}}
                     className={style.main_content_dynamic}
                >{correctPrice(props.changePercent24Hr)}</div>
            </div>
        </div>
    );
};

export default ItemCoinComponent;
