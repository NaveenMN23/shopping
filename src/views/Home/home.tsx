import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { IProductDetails } from '../../entity/product';
import { EndPoints } from '../../services/apiConfig';
import { APIService } from '../../services/rootService';
import { AppConstants } from '../../common/appConstants';
import "./home.css";

export const Home = () => {

    // Initial Value for state variables
    const initialValue = {
        productList: [],
        selectedProductSize: ""
    }

    // Stores the complete list of products fetched from DB
    const [getMasterProductList, setMasterProductList] = useState<IProductDetails[]>(initialValue.productList);

    // Contains the list of Products with respect to filter applied by size
    const [getProductList, setProductList] = useState<IProductDetails[]>(initialValue.productList);

    /* Contains the unique product size of all products 
       to update it to Master list on the initial load*/
    const productSizeList: Set<string> = new Set();

    /* React hooks to store the master product size list 
       in state variables to preserve the values by React 
       and to avoid re-render*/
    const [getMasterProductSizeList, setMasterProductSizeList] = useState<Set<string>>();

    // Stores the selected product size
    const [getSelectedProductSize, setSelectedProductSize] = useState(initialValue.selectedProductSize);

    // Get the product list from API and set it to master product list and filtered product list
    const fetchProductListFromAPI = async () => {
        const response = await APIService(EndPoints.FETCH_PRODUCT_DETAILS);
        if (response?.status === 200) {
            const responseData: IProductDetails[] = [...response.data];
            setProductList(responseData);
            setMasterProductList(responseData);
        }
    }

    // Sets the master list of product sizes in Use State
    const fetchDropdownValues = () => {
        setMasterProductSizeList(productSizeList);
    }

    //Set the filtered product with respect to size
    const filterProductBySize = async (productSize: string) => {
        let filteredProducts = getMasterProductList?.filter((product) => {
            return product.size.includes(productSize);
        });
        setProductList(filteredProducts);
    }

    // Creates dict to store the unique size of all products
    const getProductSizes = async (productSize: string[]) => {
        for (const size of productSize) {
            productSizeList.add(size);
        }
    }

    /* 
        On changing the dropdown value, 
        Calls the method to update product size
        Calls the method to filter the products
        based on product size 
    */
    const onChangeHandle = (name: string) => {
        setSelectedProductSize(name);
        filterProductBySize(name);
    };

    // Hook to call and load the initial data from DB
    useEffect(() => {
        fetchProductListFromAPI();
    }, []);

    /* Hook to update the master product list sizes based on
       master product list */
    useEffect(() => {
        fetchDropdownValues();
    }, [getMasterProductList]);

    return (
        <React.Fragment>
            <div className='navbar'>
                <div className='navbar__header'>{AppConstants.WOMENS_TOP}</div>
                <div>
                    {getMasterProductSizeList && getMasterProductSizeList?.size > 0 && <Dropdown selectedValue={getSelectedProductSize} data={[...getMasterProductSizeList]}
                        setFilteredData={onChangeHandle}></Dropdown>}
                </div>
            </div>
            <div className='cards'>
                {
                    getProductList?.map((product, _) => {
                        const productDetails: IProductDetails = product;
                        getProductSizes(productDetails.size);
                        /* Setting the local images path to provide the local copy of the images
                            since the image URL provided in image source is invalid */
                        const productImageSrc = `/images/${productDetails.productImage}`;
                        /* productImage as imageSrc
                           Product Name as Heading
                           On sale Product as subtext1
                           Exclusive product as subtext2
                           Product price as description
                           */
                        return <Card imageSrc={productImageSrc} heading={productDetails.productName}
                            subText1={productDetails.isSale && AppConstants.SALE} subText2={productDetails.isExclusive && AppConstants.EXCLUSIVE}
                            description={productDetails.price}></Card>
                    })
                }
            </div>
        </React.Fragment>
    )
}