import React from 'react'
import { useEffect, useState } from 'react'
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import { getFilterValues, filterData } from '@/utils/fetchData'
const SearchFilters = () => {
    const router = useRouter()

    const [filters, setFilters] = useState(filterData)

    const searchProperties = (filterValues) => {
        const path = router.pathname;
        console.log(path)
        const { query } = router;

        const values = getFilterValues(filterValues)
        console.log(values)

        values.forEach((item) => {
            if(item.value && filterValues?.[item.name]){
                query[item.name] = item.value
            }
           
        })

        router.push({ pathname: path, query })
    }


    return (
        <Flex bg="gray.100" p="4" justifyContent="center " flexWrap="wrap">
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select
                        onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                        placeholder={filter.placeholder}
                        w="fit-contect"
                        p="2"
                    >
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
            
        </Flex>
    )
}

export default SearchFilters