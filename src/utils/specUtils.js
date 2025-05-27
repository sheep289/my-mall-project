// 生成所有可能的规格组合
export function generateCombinations (specTypes) {
  if (!specTypes.length) return []

  // 递归生成笛卡尔积
  const cartesian = (...a) =>
    a.reduce((a, b) =>
      a.flatMap(d =>
        b.map(e =>
          [...d, e]
        )
      )
    )

  // 生成规格值数组
  const specValues = specTypes.map(spec =>
    spec.values.map(value => ({
      type: spec.name,
      value
    }))
  )

  // 生成组合
  return cartesian(...specValues).map(comb => ({
    specs: comb,
    price: 0,
    images: []
  }))
}

// 示例用法
// const combinations = generateCombinations([
//   { name: '颜色', values: ['红色', '蓝色'] },
//   { name: '尺寸', values: ['S', 'M'] }
// ])
