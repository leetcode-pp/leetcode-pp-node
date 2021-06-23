# Summary​

作为一个程序员，我们会写各种各样的代码。但是不管是什么功能，只要我们对其拆解得足够细，你会发现其都是**数据结构 + 算法**。数据结构就是数据的存储形式，算法就是对数据的一系列操作。而这些操作从本质上来说就是**增，删，查**，我们无时无刻不在与这些东西打交道。而算法的学习就需要我们稳稳地抓住这三点。当你明确了这三点之后，你会发现数据结构就是手到渠成的事情了，也就是说数据结构是为了算法服务的。当你的算法分析好了，数据结构自然也会到位。

一般而言，我们遇到一个问题，第一步是建立算法模型。第二步则是根据算法模型分析我们需要对数据进行哪些操作（增删改）。第三步，我们需要分析哪些操作最频繁，对算法的影响最大。最后，我们需要根据第三步的分析结果选择合适的数据结构。

可以看出，我们的分析过程是一层一层，逐步递进的。每一步都需要前一步分析的结果。如果你碰到的问题都严格按照我的这个思维模型进行的话，久而久之，你会逐步培养起自己的算法思维。这个是最最重要的，大家一定要把算法思维的培养放到学习算法中最高的位置。

希望大家在接下来的章节，可以用这个思维模型去练习。

* [第一章 - 先导篇](introduction.md)

  * [数据结构与算法概述](algo.md)
  * [如何衡量算法的性能](bigO.md)

* [第二章 - 基础篇](lecture/basic.md)

  * [【91 算法-基础篇】01.数组，栈，队列](lecture/basic-01.md)
  * [【91 算法-基础篇】02.链表](lecture/basic-02.md)
  * [【91 算法-基础篇】03.树](lecture/basic-03.md)
  * [【91 算法-基础篇】04.哈希表](lecture/basic-04.md)
  * [【91 算法-基础篇】05.双指针](lecture/basic-05.md)
  * [【91 算法-基础篇】06.图](lecture/basic-06.md)

* [第三章 - 进阶篇](lecture/advanced.md)

  * [【91 算法-进阶篇】01.并查集](lecture/advanced-01.md)
  * [【91 算法-进阶篇】02.Trie](lecture/advanced-trie.md)
  * [【91 算法-进阶篇】03.KMP & RK](lecture/advanced-kmp.md)
  * [【91 算法-进阶篇】04.跳表](lecture/advanced-skiplist.md)
  * [【91 算法-进阶篇】05.剪枝](lecture/advanced_prune.md)
  * [【91 算法-进阶篇】07.高频面试题](lecture/advanced-07.md)
  * [【91 算法-进阶篇】08.堆](lecture/advanced-heap.md)

* [第四章 - 专题篇](lecture/topic.md)

  * [【91 算法-专题篇】01.二分法](lecture/topic-binary-search.md)
  * [【91 算法-专题篇】02.滑动窗口](lecture/topic-slidingwindow.md)
  * [【91 算法-专题篇】03.位运算](lecture/topic-bit.md)
  * [【91 算法-专题篇】04.搜索](lecture/topic-search.md)
  * [【91 算法-专题篇】05.背包问题](lecture/topic-packages.md)
  * [【91 算法-专题篇】06.动态规划](lecture/topic-dp.md)
  * [【91 算法-专题篇】07.分治](lecture/divide.md)

* [第五章 - 题解篇](solution/README.md)

  * [基础篇](solution/basic/summary.md)

    * 【Day 1】 2020-11-01 - 66. 加一

      * [官方题解](solution/basic/d1.99.plus-one.md)

    * 【Day 2】 2020-11-02 - 821. 字符的最短距离

      * [官方题解](solution/basic/d2.821.shortest-distance-to-a-character.md)
      * [精选题解](solution/basic/d2.821.shortest-distance-to-a-character-selected-1.md)

    * 【Day 3】 2020-11-03 - 1381. 设计一个支持增量操作的栈

      * [官方题解](solution/basic/d3.1381.design-a-stack-with-increment-operation.md)

    * 【Day 4】 2020-11-04 - 394. 字符串解码

      * [官方题解](solution/basic/d4.394.decode-string.md)

    * 【Day 5】 2020-11-05 - 232. 用栈实现队列

      * [官方题解](solution/basic/d5.232.implement-queue-using-stacks.md)

    * 【Day 6】 2020-11-06 - 768. 最多能完成排序的块 II

      * [官方题解](solution/basic/d6.768.max-chunks-to-make-sorted-ii.md)
      * [精选题解](solution/basic/d6.768.max-chunks-to-make-sorted-ii-selected-1.md)

    * 【Day 7】 2020-11-07 - 24. 两两交换链表中的节点

      * [官方题解](solution/basic/d7.24.Swap-Nodes-in-Pairs.md)
      * [精选题解](solution/basic/d7.24.Swap-Nodes-in-Pairs-selected-i.md)

    * 【Day 8】 2020-11-08 - 61. 旋转链表

      * [官方题解](solution/basic/d8.61.Rotate-List.md)

    * 【Day 9】 2020-11-09 - 109. 有序链表转换二叉搜索树

      * [官方题解](solution/basic/d9.109.Convert-Sorted-List-to-Binary-Search-Tree.md)

    * 【Day 10】 2020-11-10 - 160. 相交链表

      * [官方题解](solution/basic/d10.160.Intersection-of-Two-Linked-Lists.md)
      * [精选题解](solution/basic/d10.160.Intersection-of-Two-Linked-Lists-selected-i.md)

    * 【Day 11】 2020-11-11 - 142. 环形链表 II

      * [官方题解](solution/basic/d11.142.Linked-List-Cycle-II.md)
      * [精选题解](solution/basic/d11.142.Linked-List-Cycle-II-selected-i.md)

    * 【Day 12】 2020-11-12 - 146. LRU 缓存机制

      * [官方题解](solution/basic/d12.146.LRU.md)
      * [精选题解](solution/basic/d12.146.LRU-selected-i.md)

    * 【Day 13】 2020-11-13 - 104. 二叉树的最大深度

      * [官方题解](solution/basic/d13.104.maximum-depth-of-binary-tree.md)
      * [精选题解](solution/basic/d13.104.maximum-depth-of-binary-tree-selected-1.md)
      * [精选题解](solution/basic/d13.104.maximum-depth-of-binary-tree-selected-2.md)

    * 【Day 14】 2020-11-14 - 100.相同的树

      * [官方题解](solution/basic/d14.100.same-tree.md)
      * [精选题解](solution/basic/d14.100.same-tree-selected-1.md)

    * 【Day 15】 2020-11-15 - 129. 求根到叶子节点数字之和

      * [官方题解](solution/basic/d15.129.sum-root-to-leaf-numbers.md)

    * 【Day 16】 2020-11-16 - 513. 找树左下角的值

      * [官方题解](solution/basic/d16.513.find-bottom-left-tree-value.md)
      * [精选题解](solution/basic/d16.513.find-bottom-left-tree-value-selected-1.md)

    * 【Day 17】 2020-11-17 - 297. 二叉树的序列化与反序列化

      * [官方题解](solution/basic/d17.297.serialize-and-deserialize-binary-tree.md)

    * 【Day 18】 2020-11-18 - 987. 二叉树的垂序遍历

      * [官方题解](solution/basic/d18.987.vertical-order-traversal-of-a-binary-tree.md)
      * [精选题解](solution/basic/d18.987.vertical-order-traversal-of-a-binary-tree-selected-1.md)

    * 【Day 19】2020-11-19 - 1. 两数之和

      * [官方题解](solution/basic/d19.1.two-sum.md)
      * [精选题解](solution/basic/d19.1.two-sum.selected-1.md)

    * 【Day 20】2020-11-20 - 347. 前 K 个高频元素

      * [官方题解](solution/basic/d20.top-k-frequent-elements.md)
      * [精选题解](solution/basic/d20.top-k-frequent-elements-selected-1.md)

    * 【Day 21】2020-11-21 - 447. 回旋镖的数量

      * [官方题解](solution/basic/d21.number-of-boomerangs.md)
      * [精选题解](solution/basic/d21.number-of-boomerangs-selected-1.md)

    * 【Day 22】 2020-11-22 - 3.无重复字符的最长子串

      * [官方题解](solution/basic/d22.longest-substring-without-repeating-characters.md)
      * [精选题解](solution/basic/d22.longest-substring-without-repeating-characters-selected-1.md)

    * 【Day 23】2020-11-23 - 30. 串联所有单词的子串

      * [官方题解](solution/basic/d23.substring-with-concatenation-of-all-words.md)

    * 【Day 24】2020-11-24 - 30. 解数独

      * [官方题解](solution/basic/d24.sudoku-solver.md)

    * 【Day 25】2020-11-25 - 35. 搜索插入位置

      * [官方题解](solution/basic/d25.search-insert-position.md)

    * 【Day 26】2020-11-26 74. 搜索二维矩阵

      * [官方题解](solution/basic/d26.search-a-2d-matrix.md)

    * 【Day 27】2020-11-27 26.删除排序数组中的重复项

      * [官方题解](solution/basic/d27.remove-duplicates-from-sorted-array.md)

    * 【Day 28】2020-11-28 876. 链表的中间结点

      * [官方题解](solution/basic/d28.middle-of-the-linked-list.md)

    * 【Day 29】2020-11-29 1052.爱生气的书店老板

      * [官方题解](solution/basic/d29.grumpy-bookstore-owner.md)

    * 【Day 30】2020-11-30 239. 滑动窗口最大值

      * [官方题解](solution/basic/d30.sliding-window-maximum.md)
  
  * [进阶篇](solution/advanced/summary.md)

    * 【Day 34】2020-12-04 - 树的遍历系列

      * [官方题解](solution/advanced/d34%20tree.md)

    * 【Day 35】2020-12-05 - 反转链表系列

      * [官方题解](solution/advanced/d35%20link.md)

    * 【Day 36】2020-12-06 - 位运算系列

     * [官方题解](solution/advanced/d36%20bit.md)

    * 【Day 37】2020-12-07 - 动态规划系列

     * [官方题解](solution/advanced/d37%20dp.md)

    * 【Day 38】2020-12-08 - 有效括号系列

     * [官方题解](solution/advanced/d38%20longest-valid-parentheses.md)

    * 【Day 39】2020-12-09 - 设计系列

     * [官方题解](solution/advanced/d39%20design.md)

    * 【Day 40】2020-12-10 - 前缀树系列

     * [官方题解](solution/advanced/d40%20pre.md)

    * 【Day 41】2020-12-11 - 208.实现 Trie

     * [官方题解](solution/advanced/d41.208.implement-trie-prefix-tree.md)

    * 【Day42】2020-12-12 - 677. 键值映射

     * [官方题解](solution/advanced/d42.map-sum-pairs.md)

    * 【Day43】2020-12-13 - 面试题 17.17. 多次搜索

     * [官方题解](solution/advanced/d43.multi-search-lcci.md)

    * 【Day44】2020-12-14 - 547. 朋友圈

     * [官方题解](solution/advanced/d44.friend-circles.md)

    * 【Day 45】2020-12-15 - 924. 尽量减少恶意软件的传播

     * [官方题解](solution/advanced/d45.minimize-malware-spread.md)

    * 【Day 46】2020-12-16 - 1319. 连通网络的操作次数

     * [官方题解](solution/advanced/d46.number-of-operations-to-make-network-connected.md)

    * 【Day 47】2020-12-17 - 1206. 设计跳表

     * [官方题解](solution/advanced/d47.design-skiplist.md)

    * 【Day 48】2020-12-18 - 814. 二叉树剪枝

     * [官方题解](solution/advanced/d48.814.binary-tree-pruning.md)

    * 【Day 49】2020-12-19 - 39. 组合总和

     * [官方题解](solution/advanced/d49.39.combination-sum.md)

    * 【Day 50】2020-12-20 - 40. 组合总和 II

     * [官方题解](solution/advanced/d50.40.combination-sum-ii.md)

    * 【Day 51】2020-12-21 - 47. 全排列 II

     * [官方题解](solution/advanced/d51.47.permutations-ii.md)

    * 【Day 52】2020-12-22 - 28. 实现 strStr()-BF&RK

     * [官方题解](<solution/advanced/d52.28.implement-strstr().md>)

