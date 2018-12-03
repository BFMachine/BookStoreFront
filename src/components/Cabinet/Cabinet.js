import React from 'react';
import "./Cabinet.scss";

export default function Cabinet({props}) {
    return (
        <div className="cabinet__div-wrap">

            <h3>Личный кабинет</h3>
            <hr />
            <h4>Персональные данные</h4>
            <table>
                <tbody>
                <tr>
                    <td>
                        Имя пользователя:
                    </td>
                    <td>
                        Иванов Иван Иванович
                    </td>
                </tr>
                <tr>
                    <td>
                        Email:
                    </td>
                    <td>
                        ivanov@mail.ru
                    </td>
                </tr>
                <tr>
                    <td>
                        Роль:
                    </td>
                    <td>
                        пользователь
                    </td>
                </tr>
                <tr>
                    <td>
                        Телефон:
                    </td>
                    <td>
                        +7(999)555-33-22 
                    </td>
                </tr>
                <tr>
                    <td>
                        Адрес:
                    </td>
                    <td>
                        347900 г.Таганрог, ул.Греческая, д.1
                    </td>
                </tr>
                </tbody>
            </table>

            <hr />
            <h4>Заказы</h4>

             <hr />
            <h4>Корзина</h4>

             <hr />
            <h4>Комментарии</h4>
            <hr />
            <h4>Недавно просмотренные</h4>
            <hr />
            
            
        </div>
    );

}



