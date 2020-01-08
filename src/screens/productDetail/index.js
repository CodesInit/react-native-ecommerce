import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import VMasker from 'vanilla-masker'

import productService from '../../services/productService'
import Card, { CardBody } from '../../components/card'
import Loading from '../../components/loading'
import Button from '../../components/button'
import { HeaderModal } from '../../components/headers'

import ProductImage from './components/productImage'
import ProductInfo from './components/productInfo'

import * as S from './styled'

const ProductDetail = ({ navigation }) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const id = navigation.getParam('id')

  useEffect(() => {
    const productById = async () => {
      try {
        setLoading(true)
        const { data } = await productService.productById(id)
        setProduct(data)
        setLoading(false)
        setLoading(false)
      } catch (error) {}
    }

    productById()
  }, [id])

  return (
    <S.ProductDetail>
      <HeaderModal />
      {loading || !product.name ? (
        <Loading title="Aguarde.." />
      ) : (
        <>
          <ScrollView>
            <ProductImage sourceImg={product.image} />
            <ProductInfo info={product} />
          </ScrollView>
          <Card variant="dark">
            <CardBody>
              <S.ProductContentBuy>
                <View>
                  <S.ProductTagText>Valor</S.ProductTagText>
                  <S.ProductPrice>{`R$ ${VMasker.toMoney(
                    product.price,
                  )}`}</S.ProductPrice>
                </View>
                <Button
                  variant="contained"
                  title="Adicionar"
                  onPress={() => {}}
                />
              </S.ProductContentBuy>
            </CardBody>
          </Card>
        </>
      )}
    </S.ProductDetail>
  )
}

export default ProductDetail
