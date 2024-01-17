import image from '../../assets/table.jpg';
import { TableCard } from "../../components";

const productNames = ['carne', 'pollo', 'caldo'];

/* eslint-disable max-len */
export const Tables = () => {
    // todo remove table param id and dispatch with filter
    // todo modal to add product
    return (
        <>
            <h1 className="w-full font-semibold text-4xl">
                Tables
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-3 grid-flow-row gap-4 mt-10">
                <TableCard image={image} food={productNames} name={'Table 1'} comment={'In front of the door'} />
            </section>
        </>
    );
};
