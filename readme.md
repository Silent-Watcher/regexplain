<div align="center">
  <img src="assets/regexplain.svg" alt="regexplain" width="200" height="200">

  <h1>Regexplain</h1>

  <p>
	<a href="#features">features</a> •
	<a href="#Installation">Installation</a> •
	<a href="#Usage">Usage</a>
  </p>


  <p>
	<a href="https://github.com/Silent-Watcher/regexplain/blob/master/LICENSE">
	  <img src="https://img.shields.io/github/license/Silent-Watcher/regexplain?color=#2fb64e"license">
	</a>
  </p>

  <p>⭐️ Please press the star! It greatly helps development! ⭐️</p>
  <p>A powerful command-line tool that demystifies regular expressions using AI-powered explanations. Regexplain helps developers understand complex regex patterns by providing clear, human-readable breakdowns.</p>

</div>


## ✨ Features

- **AI-Powered Explanations**: Uses Groq's AI to generate comprehensive regex explanations
- **Secure API Key Management**: Securely stores your Groq API key using system keychain
- **Proxy Support**: Works behind corporate proxies with configurable proxy settings
- **Developer-Friendly**: Built with TypeScript for reliability and type safety
- **Zero Configuration**: Works out of the box with intuitive CLI interface
- **Cross-Platform**: Compatible with Windows, macOS, and Linux

## 🚀 Installation

```bash
npm install -g regexplain
```

Or use without installation with npx:

```bash
npx regexplain <your-regex>
```

## 📖 Usage

```bash
regexplain <regex-pattern>
```

### Examples

```bash
# Explain a simple email regex
regexplain '^[\\w.+\\-]+@[a-z\\d\\-.]+\\.[a-z]+$'

# Explain a complex password validator
regexplain '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
```

## Example Output

```
📖 Explanation:

Breakdown:
- ^ : Start of the string
- [\w.+\-]+ : Matches one or more word characters, dots, plus signs, or hyphens
- @ : Literal @ character
- [a-z\d\-.]+ : Matches one or more lowercase letters, digits, hyphens, or dots
- \. : Escaped dot character (literal .)
- [a-z]+ : Matches one or more lowercase letters
- $ : End of the string

Overall Purpose: This pattern validates email addresses with a relatively permissive approach, allowing various characters in the local part and standard domain format.

Example Matches:
- user.name+tag@example.com
- user-name@sub.domain.co

Non-Matches:
- user@.com (missing domain name)
- user@com (missing top-level domain)
```

## CLI Design

Regexplain features a minimalist CLI design focused on simplicity:

```
regexplain <regex>    Explain a regular expression
```

The tool automatically:
1. Handles API key management securely
2. Provides option for proxy configuration
3. Shows loading indicators during AI processing
4. Formats output for optimal terminal readability

## 🔧 Configuration

### API Key Setup
On first run, Regexplain will prompt for your Groq API key and store it securely in your system's keychain. Alternatively, you can set it as an environment variable:

```bash
export GROQ_API_KEY=your_api_key_here
```

### Proxy Configuration
Regexplain supports HTTPS proxies through:
- Environment variables (`HTTPS_PROXY` or `https_proxy`)
- Interactive prompt during execution

## Who Will Find This Useful

- **Frontend/Backend Developers**: Understand regex patterns in codebases
- **Data Scientists**: Parse and understand data extraction patterns
- **DevOps Engineers**: Debug log parsing rules and patterns
- **Students**: Learn regular expressions through practical examples
- **Technical Writers**: Document complex regex patterns accurately
- **Code Reviewers**: Quickly understand regex logic during reviews

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).


## ⚠️ Limitations

- Requires internet connection for AI explanations
- Dependent on Groq API availability
- Complex regex patterns may have longer processing times

---

**Note**: This tool is designed for educational and productivity purposes. Always test regex patterns thoroughly in your specific use case.


## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## Support

For support and questions, please open an issue on GitHub or contact [backendwithali@gmail.com](mailto:backendwithali@gmail.com)

---

<div align="center">
  <p>
    <sub>Built with ❤️ by <a href="https://github.com/Silent-Watcher" target="_blank">Ali Nazari</a>, for developers.</sub>
  </p>
  <p>
    <a href="https://github.com/Silent-Watcher/regexplain">⭐ Star us on GitHub</a> •
    <a href="https://www.linkedin.com/in/alitte/">🐦 Follow on Linkedin</a>
  </p>
</div>