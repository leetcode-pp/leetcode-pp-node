# 数组，栈，队列

大家好，本节是数据结构的开篇内容。本节主要讲述数组，栈以及队列。

> 数组的知识大家可以轻松地迁移到字符串，因此本书不对字符串进行特殊讲解。

## 数组

数组是一种使用最为广泛的数据结构，尤其是在大家的日常开发中，原因无非就是**操作简单**和**支持随机访问**。而字符串大家也可以将其看成是一个字符数组，这更加夯实了数组的重要性。

虽然数据结构有很多，比如树，图，哈希表等。但真正的实现还需要落实到具体的基础数据结构，即**数组和链表**。之所以说他们是基础的数据结构，是因为它们直接控制物理内存的使用。

数组使用连续的内存空间，来存储一系列同一数据类型的值。如图表示的是数组的**每一项都使用一个 byte 存储**的情况。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfqvddm3zaj30na0jkjte.jpg)

那么为什么数组要存储相同类型的值呢？为什么有的语言（比如 JS）就可以存储不同类型的值呢？

实际上存储相同的类型有两个原因：

1. 相同的类型**大小是固定且连续的**(这里指的是基本类型，而不是引用类型，当然引用类型也可以存一个大小固定的指针，而将真实的内容放到别的地方，比如内存堆)，这样数组就可以**随机访问**了。试想数组第一项是 4 字节，第二项是 8 字节，第三项是 6 字节，我如何才能随机访问？而如果数组元素的大小都一样，我们就可以用**基址 + 偏移量**来定位任意一个元素，其中基址指的是数组的引用地址，如上图就是 1001。 偏移量指的是数组的索引 \* 数组每一项所占用的内存空间大小。
2. 静态语言要求指定数组的类型。

> 虽然在一些语言，比如 JavaScript 中，数组可以保存不同类型的值，这是因为其内部做了处理。对于 V8 引擎来说， 它将数据类型分为基本类型和引用类型，基本类型直接存储值在栈上，而引用类型存储指针在栈上，真正的内容存到堆上。因此不同的数据类型也可以保持同样的长度。

数组的一个特点就是**支持随机访问**，请务必记住这一点。当你需要支持随机访问的数据结构的话， 自然而然应该想到数组。

本质上，数组是一段连续的地址空间，这个是和我们之后要讲的链表的本质差别。 虽然二者从逻辑上来看都是线性的数据结构。

这里我总结了数组的几个特性，供大家参考：

- 一个数组表示的是一系列的元素
- 数组（static array）的长度是固定的，一旦创建就不能改变（但是可以有 dynamic array）
- 所有的元素需要是同一类型（个别的语言除外）
- 可以通过下标索引获取到所储存的元素（随机访问）。 比如 array[index]
- 下标可以是是 0 到 array.length - 1 的任意整数

当数组里的元素也是一个数组的时候，就可以形成多维数组。例子：

1. 用一个多维数组表示坐标
2. 用一个多维数组来记录照片上每一个 pixel 的数值

> 力扣中有很多二维数组的题目，我一般称其为 `board` 或者 `matrix`，这样通过名字一眼就能看出其是一个二维数组。

### 数组的常见操作

了解了数组的底层之后，我们来看下数组的基本操作以及对应的时间复杂度。

1. 随机访问，时间复杂度 O(1)

```py
arr = [1,2,33]
arr[0] # 1
arr[2] # 33
```

2. 遍历，时间复杂度 O(N)

```py
for num in nums:
  print(num)
```

3. 任意位置插入元素、删除元素

```py
arr = [1,2,33]
# 在索引2前插入一个5
arr.insert(2, 5)
print(arr) # [1,2,5,33]
```

我们不难发现， 插入 2 之后，新插入的元素之后的元素（最后一个元素）的索引发生了变化，从 2 变成了 3，而其前面的元素没有影响。从平均上来看，数组插入元素和删除元素的时间复杂度为`O(N)`。最好的情况删除和插入发生在尾部，时间复杂度为 `O(1)`。

基本上数组都支持这些方法。 虽然命名各有不同，但是都是上面四种操作的实现：

- each()： 遍历数组
- pop(index)：删除数组中索引为 index 的元素
- insert(item, index)：数组索引为 index 处插入元素

**时间复杂度分析小结**

- 随机访问 -> O(1)
- 根据索引修改 -> O(1)
- 遍历数组 -> O(N)
- 插入数值到数组 -> O(N)
- 插入数值到数组最后 -> O(1)
- 从数组删除数值 -> O(N)
- 从数组最后删除数值 -> O(1)

### 题目推荐

- [28. 实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)
- [75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)
- [380. 常数时间插入、删除和获取随机元素](https://leetcode-cn.com/problems/insert-delete-getrandom-o1/)

另外推荐两个思考难度小，但是边界多的题目， 这种题目如果可以一次写出 bug free 的代码会很加分。

- [59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)
- [859. 亲密字符串](https://leetcode-cn.com/problems/buddy-strings/)

## 栈

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfbikq9ipmj30cd0a73yp.jpg)

栈是一种受限的数据结构， 体现在**只允许新的内容从一个方向插入或删除，这个方向我们叫栈顶**，另一端一般称为栈底。除了栈顶的其他位置获取或操作内容都是不被允许的。

栈最显著的特征就是 LIFO(Last In, First Out - 后进先出)

举个例子：

栈就像是一个放书本的抽屉，进栈的操作就好比是想抽屉里放一本书，新进去的书永远在最上层，而出栈则相当于从里往外拿书本，永远是从最上层开始拿，所以拿出来的永远是最后进去的哪一个。

### 栈的常用操作与时间复杂度

- 进栈 - push - 将元素放置到栈顶
- 出栈 - pop - 将栈顶元素弹出
- 取栈顶 - top - 得到栈顶元素的值
- 判断是否为空栈 - isEmpty - 判断栈内是否有元素

复杂度分析：

- 进栈 - O(1)
- 出栈 - O(1)
- 取栈顶 - O(1)
- 判断是否为空栈 - O(1)

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfbil9jqqej30sd0fhdgz.jpg)

### 实现

由于栈只允许在尾部操作，我们用数组进行模拟的话，可以很容易达到 O(1)的时间复杂度。

> 当然也可以用链表实现，即链式栈。

我们可以使用一个数组加一个变量（记录栈顶的位置）的方式很方便的实现栈。实现过程也非常简单，即将数组的 API 删除几个就好了。

比如数组支持在头部添加和删除元素以及遍历数组等 API，我们将其删除就可以直接将其看成是栈。这也充分应证了我开头的话**栈是一种受限的数据结构**。

### 应用

栈是实现深度优先遍历的基础。除此之外，栈的应用还有很多，这里列举几个常见的。

- 函数调用栈
- 浏览器前进后退
- 匹配括号
- 单调栈用来寻找下一个更大（更小）元素

除此之外，有两个在数学和计算机都应用超级广泛的就是是`波兰表示法`和`逆波兰表示法`，之所以叫波兰表示法，是因为其是波兰人发明的。

波兰表示法（Polish notation，或波兰记法），是一种逻辑、算术和代数表示方法，其特点是操作符置于操作数的前面，因此也称做前缀表示法。如果操作符的元数（arity）是固定的，则语法上不需要括号仍然能被无歧义地解析。波兰记法是波兰数学家扬·武卡谢维奇 1920 年代引入的，用于简化命题逻辑。

扬·武卡谢维奇本人提到：[1]

> “ 我在 1924 年突然有了一个无需括号的表达方法，我在文章第一次使用了这种表示法。 ”

以下是不同表示法的直观差异：

- 前缀表示法 （+ 3 4 ）
- 中缀表示法 （3 + 4）
- 后缀表示法 （3 4 + ）

LISP 的 S-表达式中广泛地使用了前缀记法，S-表达式中使用了括号是因为它的算术操作符有可变的元数（arity）。逆波兰表示法在许多基于堆栈的程序语言（如 PostScript）中使用，以及是一些计算器（特别是惠普）的运算原理。

### 题目推荐

- [150. 逆波兰表达式求值](https://github.com/azl397985856/leetcode/blob/master/problems/150.evaluate-reverse-polish-notation.md)
- [1381. 设计一个支持增量操作的栈](https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/)
- [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)
- [946. 验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences/)

## 队列

同样地，队列也是一种受限的数据结构。

和栈相反，队列是只允许在**一端**进行插入，在**另一端**进行删除的线性表。因此队列(Queue)是一种先进先出(FIFO - First In First Out)的数据结构，通常情况下，我们称队列中插入元素的一端为尾部，删除元素的一端为头部。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfbilukn6tj30ng0a30t6.jpg)

队列也是一种逻辑结构，底层同样可以用数组实现，也可以用链表实现，不同实现有不同的取舍。

如果用数组实现，那么入队或者出队的时间复杂度一定有且仅有一个是$O(N)$的，其中 $N$ 为队列的长度。而使用链表实现则可以在 $O(1)$ 的时间完成任何合法的队列操作。这得益于链表对动态添加和删除的友好性。关于链表的队列的实现，我们会在后面的`队列的实现（Linked List）`部分讲解。

### 队列的操作与时间复杂度

- 插入 - 在队列的尾部添加元素
- 删除 - 在队列的头部删除元素
- 查看首个元素 - 返回队列头部的元素的值

时间复杂度取决于你的底层实现是数组还是链表。我们知道直接用数组模拟队列的话， 在队头删除元素是无法达到 O(1) 的复杂度的， 上面提到了由于存在调整数组的原因，时间复杂度为`O(N)`。因此我们需要一种别的方式，这种方式就是下面要讲的 Linked List。

以链表为例，其时间复杂度：

- 插入 - O(1)
- 删除 - O(1)
- 查看首个元素 - O(1)

实际上队列也可用数组来实现，并且插入和删除时间复杂度都是 $(1)$，如何实现呢？

其实我们值需要用两个指针 head 和 tail 表示队列的头和尾部，然后给队列分别一个空间。当插入的时候，我们在 tail 的前一个内存单元插入一个值，并更新 tail 即可。

如图是在一个队列中插入一个数字 6 的内部情况。

![](https://tva1.sinaimg.cn/large/008i3skNly1grekwmu55aj30nb0fzdh3.jpg)

在头部删除也是类似的。

这种实现的方式，需要动态开辟内存。如果不考虑内存不够而 copy 内存的情况，那么整体的时间复杂度可以控制在 $O(1)$。

> CPP 的 deque 就是这么实现的

### 应用

队列的应用同样广泛。在做题中最主要的一个应用就是广度优先遍历。而实际使用常见中同样使用广泛，比如消费队列，浏览器的 HTTP 请求队列等等。

### 队列的实现（Linked List）

我们知道链表的删除操作，尤其是删除头节点的情况下，是很容易做到 O(1)。

那么我们是否可利用这一点来弥补上面说的删除无法达到 O(1)？

> 删除非头节点可以做到 O(1)么？什么情况下可以？

但是在链表末尾插入需要遍历到尾部的话就不是 O(1)，而是 O(N)了。

解决这个问题其实不复杂，只要维护一个变量 tail， 存放当前链表的尾节点引用即可在 `O(1)` 的时间完成插入操作。

因此使用链表进行模拟的话。

入队就是：

```py
tail.next = newNode()
tail = newNode()
```

类似地，我们维护一个 head 虚拟节点也可是在 $O(1)$ 时间出队。

出队就是：

```py
nnext = head.next.next

head.next = nnext

```

具体的代码大家可以在学习完链表章节在回头补充。

另外大家在平时做题的时候可以直接使用内置的队列，比如 Python 的 deque。

> 严格意义上 deque 是双端队列，其允许在两端同时进行插入和删除。因此比普通队列的操作更宽松，不是严格的队列。不过和栈类似，我们删除几个 API 就可以将其看成是一个基于链表实现的队列了。

除此之外，还有一种队列是循环队列，用的不是很多。篇幅所限，不在这里展开，感兴趣的可以自己查一下。

## 推荐题目

- [min-stack](https://leetcode-cn.com/problems/min-stack/)
- [evaluate-reverse-polish-notation](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)
- [decode-string](https://leetcode-cn.com/problems/decode-string/)
- [binary-tree-inorder-traversal](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
- [clone-graph](https://leetcode-cn.com/problems/clone-graph/)
- [number-of-islands](https://leetcode-cn.com/problems/number-of-islands/)
- [largest-rectangle-in-histogram](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)
- [implement-queue-using-stacks](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [01-matrix](https://leetcode-cn.com/problems/01-matrix/)

## 相关专题

### 前缀和

关于前缀和， 看我的这篇文章就够了 ~ [【西法带你学算法】一次搞定前缀和](https://lucifer.ren/blog/2020/09/27/atMostK/)

### 单调栈

单调栈适合的题目是求解**第一个一个大于 xxx**或者**第一个小于 xxx**这种题目。所有当你有这种需求的时候，就应该想到[单调栈](https://lucifer.ren/blog/2020/11/03/monotone-stack/)。

下面两个题帮助你理解单调栈， 并让你明白什么时候可以用单调栈进行算法优化。

- [84. 柱状图中最大的矩形](https://github.com/azl397985856/leetcode/blob/master/problems/84.largest-rectangle-in-histogram.md)
- [739.每日温度](https://github.com/azl397985856/leetcode/blob/master/daily/2019-06-06.md)

单调队列和单调栈的思路比较类似，感兴趣的可以自己查阅一下相关资料作为扩展。

### 栈匹配

当你需要比较类似栈结构的匹配的时候，就应该想到使用栈。

比如判断有效括号。 我们知道有效的括号是形如：`((()))` 这样的括号， 其中第一个左括号和最后一个右括号匹配，因此一种简单的思路是把左括号看出是入栈，右括号看出是出栈即可轻松利用栈的特性求解。·

再比如链表的回文判断。 我们就可以一次遍历压栈，再一次遍历出栈的同时和当前元素比较即可。这也是利用了栈的特性。

- [20. 有效的括号](https://github.com/azl397985856/leetcode/blob/master/problems/20.valid-parentheses.md)

### 分桶 & 计数

[49.字母的异位词分组](https://leetcode-cn.com/problems/group-anagrams/description/)，[825. 适龄的朋友](https://leetcode-cn.com/problems/friends-of-appropriate-ages/solution/) 以及 [【每日一题】 Largest Range](https://github.com/azl397985856/leetcode/issues/420) 等就是分桶思想的应用。力扣关于分桶思想的题目有很多，大家只要多留心就不难发现。

从算法上看，我们通常会建立一个 counts 数组来计数，其本质和 Python 的 collections.Counter 类似，你也可用数组进行模拟，代码也比较简单。 比如：

```py
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        str_dict = collections.defaultdict(list)
        for s in strs:
          s_key = [0] * 26
          for c in s:
            s_key[ord(c)-ord('a')] += 1
          str_dict[tuple(s_key)].append(s)
        return list(str_dict.values())

```

如果代码就是 [49.字母的异位词分组](https://leetcode-cn.com/problems/group-anagrams/description/) 的一个可行解。 代码中的 s_key 就是一个桶，其中桶的大小为 26，表示一个单词中的 26 个字母出现的频率分布，这点有点像计数排序。

适合用分桶思想的题目一定是不在乎顺序的，这一点也不难理解，比较分桶之后原来的顺序信息就丢失了。

# 总结

数组和链表是最最基础的数据结构，大家一定要掌握，其他数据结构都是基于两者产生的。

栈和队列是两种受限的数据结构，我们人为地给数组和链表增加一个限制就产生了它们。那我们为什么要自己给自己设限制呢？目的就是为了简化一些常见问题，这就好像是人类模仿鸟制造了飞机，模仿鸽子做了地震仪一样。栈和队列能帮我们简化问题。 比如队列的特性就很适合做 BFS，栈的特性就很适合做括号匹配等等。你可以这么理解。 我们一开始做 BFS 的时候，没有队列。慢慢大家写地多了，发现是不是可以**抽象一个数据结构单独来处理这种通用的需求**？队列就产生了，其他数据结构也是一样。

# 参考

- [基础数据结构 by lucifer](https://github.com/azl397985856/leetcode/blob/master/thinkings/basic-data-structure.md)
