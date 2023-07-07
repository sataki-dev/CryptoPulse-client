import style from "./main-page.module.scss"
import {useEffect, useRef, useState} from "react";
import {getAllCoins} from "../../core/services/http.service";
import {CoinInterfaces} from "../../core/types/defolt-types";
import ItemCoinComponent from "./item-coin/item-coin.component";
import {Input, Pagination} from 'antd';
import {debounceTime, fromEvent, map, Observable, Subscription} from "rxjs";
import {useNavigate} from "react-router-dom";

const MainPageComponent = () => {

    const navigate = useNavigate()

    const [coinList, setCoinList] = useState<CoinInterfaces[]>([])
    const [queryParam, setQueryParam] = useState<{limit: number, offset: number, search?: string}>({limit: 30, offset: 0, search: ''})

    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        getAllCoins(queryParam).then(({data}) => {
            setCoinList(data.data)
        })
    }, [queryParam])

    /**EVENTS====================================================================*/
    const onChangePaginator = (page: number, pageSize: number) => {
        setQueryParam({limit: pageSize, offset: pageSize * (page - 1)})
        setInputValue('')
    }

    const inputEvent$ = useRef<Observable<Event> | undefined>(undefined)
    const sub = useRef<Subscription | undefined>(undefined)
    useEffect(() => {
        inputEvent$.current = fromEvent(document.querySelector<any>('#inputElement'), 'input')
        sub.current = inputEvent$.current
            ?.pipe(
                map((item: any) => item.srcElement.value),
                debounceTime(600)
            ).subscribe((data: string) => {
                const newQueryParam = {limit: 30, offset: 0, search: data}
                setQueryParam(newQueryParam)
            })
        return () => {
            if (sub.current) sub.current?.unsubscribe()
        }
    }, [])
    /**EVENTS====================================================================*/

    const constructCoinsList = coinList.map((coin: CoinInterfaces) => {
        return (
            <div key={coin.rank} className={style.main_list_item}
                 onClick={() => navigate(`coin/${coin.symbol}`)}>
                <ItemCoinComponent {...coin}></ItemCoinComponent>
            </div>
        )
    })

    return (
        <div className={style.main}>

            <div className={style.main_filter}>
                <Input placeholder="Поиск монеты..." id='inputElement'
                       onChange={(event) => setInputValue(event.target.value)}
                       value={inputValue}/>
            </div>

            <div className={style.main_list}>
                {constructCoinsList}
            </div>

            <div className={style.main_pagination}>
                <Pagination defaultCurrent={1}
                            defaultPageSize={30}
                            pageSizeOptions={[30, 50, 100]}
                            total={1999}
                            onChange={onChangePaginator}
                            showLessItems={true}/>
            </div>

        </div>
    );
};

export default MainPageComponent;
