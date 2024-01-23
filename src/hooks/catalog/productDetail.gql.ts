import { gql } from "@apollo/client"

export function productDetailQuery(sku: string) {
  return gql`query {
    products(filter: { sku: { eq: "${sku}" } }) {
        items {
            id
            uid
            categories {
                uid
                breadcrumbs {
                    category_id
                    category_uid
                    category_name
                    category_level
                    category_url_key
                }
            }
            description {
                html
            }
            short_description {
                html
            }
            id
            uid
            media_gallery_entries {
                uid
                label
                position
                disabled
                file
            }
            meta_description
            name
            price {
                regularPrice {
                    amount {
                        currency
                        value
                    }
                }
            }
            price_range {
                maximum_price {
                    final_price {
                        currency
                        value
                    }
                    regular_price {
                        value
                        currency
                    }
                    discount {
                        amount_off
                        percent_off
                    }
                }
            }
            review_count
            rating_summary
            sku
            small_image {
                url
            }
            stock_status
            url_key
            ... on ConfigurableProduct {
                configurable_options {
                    attribute_code
                    attribute_id
                    uid
                    label
                    values {
                        uid
                        default_label
                        label
                        store_label
                        use_default_value
                        value_index
                        swatch_data {
                            ... on ImageSwatchData {
                                thumbnail
                            }
                            value
                        }
                    }
                }
                variants {
                    attributes {
                        code
                        uid
                        value_index
                    }
                    product {
                        uid
                        media_gallery_entries {
                        uid
                        disabled
                        file
                        label
                        position
                        }
                        sku
                        stock_status
                        price {
                            regularPrice {
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                        price_range {
                            maximum_price {
                                final_price {
                                    currency
                                    value
                                }
                                discount {
                                    amount_off
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}`
}
