# Few rules to keep collaboration enjoyable:

first go to your console and type `npm help npm-coding-style`. read it. then look at my code. then the rest here (i don't stick with all npm style):

* every variable _definition_ desires a `var`.
* variable declarations are summed up in single `var`.
* coma first only in objects and arrays. indent stuff accordingly.
* use spaces. the more the better new lines are spaces too.
* in code doc is nice, but i don't refuse code without it, if i can easily understand it. Otherwise i'll ask for doc. One exception: document the public api.
* structure the modules. use function hoisting if needed. the structure should be:
  * imports: core, 3rdParty, package internals. this order
  * module-public stuff: the module.exports block, ideally one single assignment, use hoisting
  * module-local vars
  * module main piece (the "class" or the function which does the thing)
  * module-private stuff such as helper functions
* rebase your commits before pr. squash related commits.
* write tests. if you're solving an issue write test for the issue.