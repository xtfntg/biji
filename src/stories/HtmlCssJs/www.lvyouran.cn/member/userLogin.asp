
document.write("<div id=\"index_prolist\">");

document.write("<DIV id=index_search2>");
document.write("  <div class=query>");

document.write("      <form method=\"post\" name=\"\" action=\"/member/login.asp?action="http://www.lvyouran.cn/member/login/"">");
document.write("    <table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" align=\"center\">");
document.write("        <tr>");
document.write("          <td height=\"24\">用户名：</td>");
document.write("          <td><input type=\"text\" name=\"LoginName\"  style=\"BORDER: #CCCCCC 1px solid;WIDTH: 120px; height:18px;\" size=16 maxlength=\"50\" onfocus=\"this.select();\" color:#0099ff /></td>");
document.write("        </tr>");
document.write("        <tr>");
document.write("          <td height=\"24\">密  码：</td>");
document.write("          <td><input type=\"password\" name=\"userPass\"  style=\"BORDER: #CCCCCC 1px solid;WIDTH: 120px; height:18px;\" size=16 maxlength=\"50\" onfocus=\"this.select();\" color:#0099ff /></td>");
document.write("        </tr>");
document.write("        <tr>");
document.write("        <td height=\"24\" align=\"left\">验证码：</td>");
document.write("        <td align=\"left\"><input type=\"text\" name=\"code\"  style=\"BORDER: #CCCCCC 1px solid;WIDTH: 50px; height:18px;\" size=10 maxlength=\"4\" onfocus=\"this.select();\" color:#0099ff /><a onClick=\"SeedImg.src=\'/inc/checkcode.asp\'\"><img src="../-/inc/checkcode.asp/-" tppabs="http://www.lvyouran.cn/"/inc/checkcode.asp/"" id=\"SeedImg\" align=\"absmiddle\" style=\"cursor:pointer;\" border=\"0\" /></a></td>");
document.write("        </tr>");
document.write("        <tr>");
document.write("          <td height=\"18\" colspan=\"2\"><input type=\"submit\" value=\"登陆\" style=\"BORDER: #CCCCCC 1px solid;WIDTH: 60px; height:22px; cursor:pointer\"/>&nbsp;");
document.write("              <input type=\"button\" value=\"注册\" onclick=\"location.href=\'/member/reg.asp\'\" style=\"BORDER: #CCCCCC 1px solid;WIDTH: 60px; height:22px;cursor:pointer\"/></td>");

document.write("        </tr>");
document.write("    </table>");
document.write("      </form>");

document.write("  </div>");
document.write("</DIV>");
document.write("<DIV id=index_search3></DIV></DIV>");