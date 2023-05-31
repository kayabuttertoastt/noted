import 'package:flutter/material.dart';
import 'package:noted/model/constant/colors.dart';
import 'package:noted/view/post/postArticles.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() {
    return _HomeState();
  }
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primary,
      body: Stack(
        children: [
          ListView(
            children: const [
              SizedBox(height: 650),
              // Add your other ListView items here
            ],
          ),
          Positioned(
            bottom: 16.0,
            right: 8.0,
            child: SizedBox.fromSize(
              size: const Size(35, 35),
              child: ClipOval(
                child: Material(
                  color: Colors.white,
                  child: InkWell(
                    splashColor: primary,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const PostArticles(),
                        ),
                      );
                    },
                    child: const Icon(Icons.add),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
