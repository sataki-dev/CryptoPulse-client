import { useEffect, useState } from 'react';
import {getCoin} from '../../core/services/http.service';
import { CoinInterfaces } from '../../core/types/defolt-types';
import style from './item-page.module.scss'
import Icon from "react-crypto-icons";
import formatMoney from '../base-module/customFormatMoney/customFormatMoney';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Button } from 'antd';


/** кнопкв "на главнуб страницу"*/
/** красивый вывод всей информации, пользоваться библиотеккой antd*/


const ItemPageComponent = () => {
    const navigate = useNavigate()
    const [coin, setCoin] = useState<CoinInterfaces | undefined>()
    const [quaryParam, setQuaryParam] = useState<string>('')

    useEffect( () => {
        const aset = decodeURIComponent(window.location.pathname.split('/coin/')[1])
        getCoin(aset).then((respons: any) => {
            setCoin(respons.data.data)
        })
    }, [quaryParam])
    return (
        <div className={style.main}>
            <Button  type="text" className={style.buttonBack} onClick={() => navigate(`/*`)}>
                <AiOutlineArrowLeft className={style.buttonIcon}></AiOutlineArrowLeft>
                <div className={style.buttonText}>Вернуться на главную</div>
            </Button>
            {
                coin &&
                <div className={style.header}>
                    {
                        coin.symbol !== 'RVT' &&
                        <Icon className={style.headerIcon} name={coin.symbol.toLocaleLowerCase()} size={35}/>
                    }
                    <p className={style.headerName}>{coin.name}</p>
                </div>
            }
            {
                coin &&
                <>
                    <p>Цена : <b>${formatMoney(coin.priceUsd)}</b></p>
                    <p>Изменение направления за 24 часа : <b>{formatMoney(coin.changePercent24Hr)}%</b></p>
                    <p>Рыночная капитализация : <b>${formatMoney(coin.marketCapUsd)}</b></p>
                    <p>Объем торгов (24ч) : <b>${formatMoney(coin.volumeUsd24Hr)}</b></p>
                    <p>Доступное предложение : <b>{formatMoney(coin.supply)} {coin.symbol}</b></p>
                    <p>Количество выпущенных активов : <b>{formatMoney(coin.maxSupply)}</b></p>
                </>
            }
        </div>
    )


};

export default ItemPageComponent;
