import style from "./main-page.module.scss"
import {useEffect, useState} from "react";
import {getAllCoins} from "../../core/services/http.service";
import {CoinInterfaces} from "../../core/types/defolt-types";
import ItemCoinComponent from "./item-coin/item-coin.component";
import { Pagination } from 'antd';

const MainPageComponent = () => {

    const [coinList, setCoinList] = useState<CoinInterfaces[]>([])
    const [queryParam, setQueryParam] = useState<Object>({limit: 20, offset: 0})

    useEffect(() => {
        getAllCoins(queryParam).then(({data}) => {
            setCoinList(data.data)
            console.log(data)
        })
    }, [queryParam])

    const onChangePaginator = (page: number, pageSize: number) => {
        setQueryParam({limit: pageSize, offset: pageSize * (page - 1)})
    }

    const constructCoinsList = coinList.map((coin: CoinInterfaces) => {
        return (
            <div key={coin.rank} className={style.main_list_item}>
                <ItemCoinComponent {...coin}></ItemCoinComponent>
            </div>
        )
    })

    return (
        <div className={style.main}>
            <div className={style.main_list}>
                {constructCoinsList}
            </div>
            <div className={style.main_pagination}>
                <Pagination defaultCurrent={1}
                            defaultPageSize={20}
                            pageSizeOptions={[20, 50, 100]}
                            total={999}
                            onChange={onChangePaginator}
                            showLessItems={true}/>
            </div>
        </div>
    );
};

export default MainPageComponent;
