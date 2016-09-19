#ai_re_1.2
#Html/css/js extension panel for Adobe Illustrator CC+
##What's new:
* Fixed some bugs.
* Deleted `Escape` button - you must handle escaping symbols if needed, 
because in one string may contain escaped and non-escaped special symbols.

##Great Destination:
* Search and replace by regular expression
* _Keeps the original formatting of the text_
* Extends standard Illustrator dialog "Search and Replace..."

##Using:
1. Select text frame[s] using the Selection Tool, Direct Selection Tool or Group Selection Tool.
2. In the `Regular Expression:` field input a regular expression pattern.
3. On the `Replace To:` field input the replacement string.
4. Set the flags `g`, `m`, `i`.
5. Push the `Replace button`.

##Other options:
* Can use the references to captured groups like `$1`, `$2` etc. in the both input fields.
* Can use the special chearacters like `\r`, `\t` etc. in both input fields.
* `Refresh` button is used to clear the input fields and the console.
* The result of the work is displayed in the `Output info` field.
* `GitHub` button opens this public repository in the default internet browser.
